import { evaluate } from "./Evaluate.js";
import { History } from "./History.js";
import { Error } from "./Error.js";

// Get the display element
const historyTextarea = document.getElementById("history");
const fullHistoryTextarea = document.getElementById("full-history");
const display = document.getElementById("display");
const MIN_TEXTAREA_HEIGHT = 28;
const MAX_TEXTAREA_HEIGHT = 70;

// keyboard keys array
const NUMBER_KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const OPERATIONS_KEYS = [".", "-", "+", "/", "*", "%", "(", ")", "π"];

// Check for errors and reset the display if needed
function isError(){
  if (Error.some((err) => err.message == display.value)) {
    display.value = "";
    return
  }
}


//this will be used to set history in the textarea
function setHistoryUI(){
  if(History.getHistory().length > 0){
    document.getElementById("history-btn").style.display = "block"
    let newTextareaHeight = (MIN_TEXTAREA_HEIGHT * (History.getHistory().length + 1 ));
    
    if(newTextareaHeight > MAX_TEXTAREA_HEIGHT){
      historyTextarea.style.height = MAX_TEXTAREA_HEIGHT +"px";
    }else{
      historyTextarea.style.height = newTextareaHeight + "px";
    }
    
    historyTextarea.style.paddingBottom = '10px'
    historyTextarea.innerHTML = History.formatHistory()
    historyTextarea.style.display ='block'
    historyTextarea.scrollTop = historyTextarea.scrollHeight
    fullHistoryTextarea.innerHTML = History.formatHistory() 
    fullHistoryTextarea.style.paddingRight = '10px'
    fullHistoryTextarea.scrollTop = fullHistoryTextarea.scrollHeight
  }else{
    document.getElementById("history-btn").style.display = "none"
  }
}

setHistoryUI() //set history on page load

// let testcase = evaluate("5 - 9 × 45 + tan( 120 + 45 - 60 )");
// console.log(Number(testcase).toFixed(2));

// itrate throught each element and check which one is clicked
document.querySelector(".calculator-buttons").addEventListener("click", function (event) {
  // Check if the clicked element is a button (and not something else)
  if (!event.target.closest(".button")) return;

  const button = event.target.closest(".button");
  const value = button.dataset.value;

  // Check for errors and reset the display if needed
  isError()

  // 'Degree' or 'Radians' button click to toggle 'active' class
  if (value === 'Degree' || value === 'Radians') {
    const activeButton = document.querySelector(".active"); // this will find current active button

    // If their is an active button it will remove the 'active' class from it
    if (activeButton) {
      activeButton.classList.remove("active");
    }

    // Add the 'active' class to the clicked button
    button.classList.add("active");
    alert('Change to '+value);
    return
  }

  // Handle the "=" button to evaluate the expression
  if (value === "=") {
    if (display.value === "") return
    try {
      let result = evaluate(display.value, value);
      if (!isNaN(result) && !Array.isArray(result)) {
        console.log(result);
        History.setHistory(display.value, result);
        console.log(History.getHistory(), result);
        setHistoryUI();
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
  // If the key is a decimal point (.), ensure it's only added once
  if (value === "." && display.value.includes(".")) {
    return; // Don't add another decimal point
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

// event listener that will be triggered when a key is pressed
document.addEventListener("keydown", function (e) {
  // console.log(e.key);
  
  // it will calculate the input 
  if (e.key == "Enter" && display.value != "") {
      let result = evaluate(display.value)

      if(!isNaN(result) && !Array.isArray(result)){
        History.setHistory(display.value, result);
        // console.log(History.getHistory());
        setHistoryUI(); // set history
      }
      display.value = result;
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

      // let testM= "NaN";
      // console.log(Error.some((err) => err.message == testM));

      // Check for errors and reset the display if needed
      isError()
      
      // If the key is a decimal point (.), ensure it's only added once
      if (e.key === "." && display.value.includes(".")) {
        return; // Don't add another decimal point
      }

      // Otherwise, append the key to the display value

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


// toogle dark mode light mode code starts from here
let toggleMode = document.querySelector(".toogle-mode");
const themeMode = localStorage.getItem("theme-mode") === "dark-mode"
  ? "dark-mode"
  : "light-mode";
if (themeMode === "dark-mode") {
  toggleMode.innerHTML = '<i class="fa-solid fa-sun"></i>'; // sun icon for dark mode
      document.getElementsByTagName("body")[0].style.backgroundColor =
        "#1b1c1d";
      document.getElementsByClassName("calculator")[0].style.backgroundColor =
        "#1b1c1d";
} else {
  document.getElementsByTagName("body")[0].style.backgroundColor =
        "#f4f4f4";
  document.getElementsByClassName("calculator")[0].style.backgroundColor =
        "#fff";
  toggleMode.innerHTML = '<i class="fa-solid fa-moon"></i>'; // moon icon for light mode
}

// Ensure the element exists before adding an event listener
if (toggleMode) {
  // Check and apply the previously saved theme from localstorage
  const savedTheme = localStorage.getItem("theme-mode");
  //   console.log(savedTheme);
  if (savedTheme && savedTheme === "dark-mode") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.add("light-mode");
  }

  toggleMode.addEventListener("click", function (e) {
    const themeMode = document.body.classList.contains("dark-mode")
      ? "light-mode"
      : "dark-mode";
    // console.log(themeMode);
    // console.log( document.body.classList);
    // console.log( document.body.classList.contains("dark-mode"));
    if (themeMode === "dark-mode") {
      this.innerHTML = '<i class="fa-solid fa-sun"></i>'; // sun icon for dark mode
      document.getElementsByTagName("body")[0].style.backgroundColor =
        "#1b1c1d";
      document.getElementsByClassName("calculator")[0].style.backgroundColor =
        "#1b1c1d";
    } else {
      this.innerHTML = '<i class="fa-solid fa-moon"></i>'; // moon icon for light mode
      document.getElementsByTagName("body")[0].style.backgroundColor =
        "#f4f4f4";
      document.getElementsByClassName("calculator")[0].style.backgroundColor =
        "#fff";
    }
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme-mode", themeMode);
  });
}

// by click on this button it will OPEN the pop up model
document.getElementById("history-btn").addEventListener("click", function () {
  document.getElementById("full-history-container").style.display = "block";
});

// by click on this button it will CLSOE the pop up model
document.getElementById("close-btn").addEventListener("click", function () {
  document.getElementById("full-history-container").style.display = "none";
});

// export default EventHandler;