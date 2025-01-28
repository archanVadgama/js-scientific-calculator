import { evaluate } from "./Evaluate.js";
import { History } from "./History.js";
import { Error } from "./Error.js";

// Get the display element
const historyTextarea = document.getElementById("history");
const fullHistoryTextarea = document.getElementById("full-history");
const display = document.getElementById("display");
const BUTTONS = document.querySelectorAll(".button");
const MIN_TEXTAREA_HEIGHT = 15;
const MAX_TEXTAREA_HEIGHT = 60;

// keyboard keys array
const NUMBER_KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const OPERATIONS_KEYS = [".", "-", "+", "/", "*", "%", "(", ")"];

//this will be used to set history in the textarea
function setHistoryUI(){
  if(History.getHistory().length > 0){
    document.getElementById("history-btn").style.display = "block"
    let newTextareaHeight = 10 + (MIN_TEXTAREA_HEIGHT * History.getHistory().length);
    
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
  }else{
    document.getElementById("history-btn").style.display = "none"
  }
}

setHistoryUI() //set history on page load

// itrate throught each element and check which one is clicked
BUTTONS.forEach((button) => {
  button.addEventListener("click", function () {
    const value = button.dataset.value;

    // ite will check error and if this is error in input it will clear error adn new input value can be inserted
    if(Error.some((err) => err.message == display.value)){
      display.value = "";
    }

    if (value === "=") {
      try {
        if (display.value != "") {
          let result = evaluate(display.value, value);
          // console.log(evaluate("45+98/5-(10*2)"));
          if(!isNaN(result) && !Array.isArray(result)){
            History.setHistory(display.value, result);
            console.log(History.getHistory(),result);
            setHistoryUI()
          }
          display.value = result;
        }
      } catch {
        display.value = Error[2].message;
      }
    } else if (value === "C") {
      display.value = "";
    // } else if (value === "square") {
    //   display.value = display.value*display.value;
    // } else if (value === "cube") {
    //   display.value = display.value*display.value*display.value;
    } else if (value === "D") {
      display.value = display.value.slice(0, -1);
    } else {
      if(NUMBER_KEYS.includes(value)){
        display.value += value;
      }else{
        display.value += " " +value+ " ";
      }
    }
  });
});

  // let result = evaluate("6+2")
  // console.log("FINAL RESULT "+result);
// 6+8*2-5+(8-2+5*3)/2

// event listener that will be triggered when a key is pressed
document.addEventListener("keydown", function (e) {
  // console.log(e.key);
  
  // it will calculate the input 
  if (e.key == "Enter") {
    if (display.value != "") {
      let result = evaluate(display.value)
      // console.log(result);

      if(!isNaN(result) && !Array.isArray(result)){
        History.setHistory(display.value, result);
        // console.log(History.getHistory());
        setHistoryUI(); // set history
      }
      display.value = result;
    }
  }

  // it will clear the input
  if (e.key == "Escape") {
    display.value = "";
  }

  // press 's' for sin() 
  if (e.key == "S" || e.key == "s") {
    display.value += " sin( ";
  }

  // press 'c' for cos() 
  if (e.key == "C" || e.key == "c") {
    display.value += " cos( ";
  }

  // press 't' for tan() 
  if (e.key == "T" || e.key == "t") {
    display.value += " tan( ";
  }

  // press 'l' for log() 
  if (e.key == "L" || e.key == "l") {
    display.value += " log( ";
  }

  // it will delete the last character
  if (e.key == "Delete" || e.key == "Backspace") {
    display.value = display.value.slice(0, -1);
  }

  // concat both arrays and check which key is pressed
  NUMBER_KEYS.concat(OPERATIONS_KEYS).forEach(function (value) {
    if (value == e.key) {

      // let testM= "NaN";
      // console.log(Error.some((err) => err.message == testM));

      // ite will check error and if this is error in input it will clear error adn new input value can be inserted
      if(Error.some((err) => err.message == display.value)){
        display.value = "";
      }
      
      // If the key is a decimal point (.), ensure it's only added once
      if (e.key === "." && display.value.includes(".")) {
        return; // Don't add another decimal point
      }

      // Otherwise, append the key to the display value

      // it will change multiply(*) to ×
      if (e.key == "*") {
        display.value += " × ";
      }else
        // it will change divide(/) to ÷ 
        if (e.key == "/") {
          display.value += " ÷ ";
        }else{
          if(NUMBER_KEYS.includes(e.key)){
            display.value += e.key;
          }else{
            display.value += " " +e.key+ " ";
          }
        }
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