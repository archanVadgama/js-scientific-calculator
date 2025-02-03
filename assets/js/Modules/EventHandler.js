import { CalculatorModule } from "./Evaluate.js";
import { History } from "./History.js";
import { Error, isError } from "./Error.js";
import { showToast } from "./Toast.js";

export function setupEventHandlers() {

  // Get the display element
  const display = document.getElementById("display");

  // keyboard keys array
  const NUMBER_KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const OPERATIONS_KEYS = [".", "-", "+", "/", "*", "%", "(", ")", "π"];

  let selectedMode;

  History.setHistoryUI() //set history on page load

  // itrate throught each element and check which one is clicked
  document.querySelector(".calculator-buttons").addEventListener("click", function (event) {
    // Check if the clicked element is a button (and not something else)
    if (!event.target.closest(".button")) return;

    const button = event.target.closest(".button");
    const value = button.dataset.value;
    const activeButton = document.querySelector(".active");
    
    // Check for errors and reset the display if needed
    isError()
    
    // 'degree' or 'radian' button click to toggle 'active' class
    if (value === 'degree' || value === 'radian') {
      
      const activeButton = document.querySelector(".active"); // this will find current active button
      // If their is an active button it will remove the 'active' class from it
      if (activeButton) {
        activeButton.classList.remove("active");
      }

      // Add the 'active' class to the clicked button
      button.classList.add("active");

      showToast('Change to '+value)
      return
    }
    
    // Handle the "=" button to evaluate the expression
    if (value === "=") {
      if (display.value === "") return
      try {
        selectedMode = activeButton.dataset.value;
        let result = CalculatorModule.evaluate(display.value, selectedMode);
        if (!isNaN(result) && !Array.isArray(result)) {
          History.setHistory(display.value, result);
          History.setHistoryUI();
        }
        display.value = result;
        return
      } catch {
        display.value = Error[2].message;
        return
      }
    } 

    // Handle the 'C' button (clear the display)
    if (value === "C") {
      display.value = "";
      return
    } 

    if (value === "π") {
      if(!display.value == ""){
        display.value = display.value + " × π  "
      }else{
        display.value = display.value + " π "
      }
      return 
    } 

    if (value === "e") {
      if(!display.value == ""){
        display.value = display.value + " × e  "
      }else{
        display.value = display.value + " e "
      }
      return 
    } 

    // If the key is a decimal point (.), ensure only added once
    if (value === "." && display.value.includes(".")) {
      return; 
    }

    // Handle the 'D' button (delete the last character)
    if (value === "D") {
      isError()
      display.value = display.value.slice(0, -1);
      return
    } 
    
    // Handle numbers and operators (add them to the display)
    if (NUMBER_KEYS.includes(value)) {
      display.value += value;
      return
    }
    
    display.value += " " + value + " ";
    
  });

  // event listener that will be triggered when a key is pressed in keyboard
  document.addEventListener("keydown", function (e) {

    const activeButton = document.querySelector(".active");
    selectedMode = activeButton.dataset.value;

    // it will calculate the input 
    if (e.key == "Enter" && display.value != "") {
      try {

        let result = CalculatorModule.evaluate(display.value, selectedMode)
        
        if(!isNaN(result) && !Array.isArray(result)){
          History.setHistory(display.value, result);
          History.setHistoryUI(); // set history
        }
        display.value = result;
        return
      } catch {
        display.value = Error[2].message;
        return
      }
    }
    
    // it will clear the input
    if (e.key == "Escape") {
      display.value = "";
      return
    }

    // press 's' for sin() 
    if (e.key == "S" || e.key == "s") {
      display.value += " sin( ";
      return
    }

    // press 'c' for cos() 
    if (e.key == "C" || e.key == "c") {
      display.value += " cos( ";
      return
    }
    // press 't' for tan() 
    if (e.key == "T" || e.key == "t") {
      display.value += " tan( ";
      return
    }
    
    // press 'l' for log() 
    if (e.key == "L" || e.key == "l") {
      display.value += " log( ";
      return
    }

    // it will delete the last character
    if (e.key == "Delete" || e.key == "Backspace") {
      isError()
      display.value = display.value.slice(0, -1);
      return
    }

    // concat both arrays and check which key is pressed
    NUMBER_KEYS.concat(OPERATIONS_KEYS).forEach(function (value) {
      if (value == e.key) {

        // Check for errors and reset the display if needed
        isError()
        
        // If the key is a decimal point (.), ensure only added once
        if (e.key === "." && display.value.includes(".")) {
          return; // Don't add another decimal point
        }
        
        // it will change multiply(*) to ×
        if (e.key == "*") {
          display.value += " × ";
          return
        }
        // it will change divide(/) to ÷ 
        if (e.key == "/") {
          display.value += " ÷ ";
          return
        }

        
        if(NUMBER_KEYS.includes(e.key)){
          display.value += e.key;
          return
        }
        
        display.value += " " +e.key+ " ";
      }
    });
  });

  // it will clear the history
  let clearHistorySelector = document.querySelector('.clear-btn');
  let leftSideSection = document.querySelector('.left-side');

  clearHistorySelector.addEventListener('click', function (e) {
      History.clearHistory()
      leftSideSection.style.display = "none";
      document.getElementById("full-history-container").style.display = "none";
      showToast('History Cleared')
  });
}