import { evaluate } from "./Evaluate.js";
import { History } from "./History.js";

// Get the display element
const display = document.getElementById("display");
const BUTTONS = document.querySelectorAll(".button");

// itrate throught each element and check which one is clicked
BUTTONS.forEach((button) => {
  button.addEventListener("click", function () {
    const value = button.dataset.value;

    if (value === "=") {
      try {
        if (display.value != "") {
          let result = evaluate(display.value)
          // console.log(evaluate(display.value));
          if(!isNaN(result)){
            History.setHistory(display.value, result);
            // console.log(History.getHistory());
          }
          display.value = result;
        }
      } catch {
        display.value = "Error";
      }
    } else if (value === "C") {
      display.value = "";
    } else if (value === "D") {
      display.value = display.value.slice(0, -1);
    } else {
      display.value += value;
    }
  });
});

// keys array
const NUMBER_KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const OPERATIONS_KEYS = [".", "-", "+", "/", "*", "%"];
let pressionCount = 0;

// event listener that will be triggered when a key is pressed
document.addEventListener("keydown", function (e) {
  // console.log(e.key);

  // it will calculate the input 
  if (e.key == "Enter") {
    if (display.value != "") {
      let result = evaluate(display.value)
      // console.log(evaluate(display.value));
      if(!isNaN(result)){
        History.setHistory(display.value, result);
        // console.log(History.getHistory());
      }
      display.value = result;
    }
  }

  // it will clear the input
  if (e.key == "Escape") {
    display.value = "";
  }
  // it will delete the last character
  if (e.key == "Delete" || e.key == "Backspace") {
    display.value = display.value.slice(0, -1);
  }

  // concat both arrays and check which key is pressed
  NUMBER_KEYS.concat(OPERATIONS_KEYS).forEach(function (value) {
    if (value == e.key) {
      // If the key is a decimal point (.), ensure it's only added once
      if (e.key === "." && display.value.includes(".")) {
        return; // Don't add another decimal point
      }

      // Otherwise, append the key to the display value
      display.value += e.key;
    }
  });
});

let toggleMode = document.querySelector(".toogle-mode");
const themeMode = document.body.classList.contains("dark-mode")
  ? "dark-mode"
  : "light-mode";

if (themeMode === "dark-mode") {
  document.getElementsByTagName("body")[0].style.backgroundColor = "#1b1c1d";
  toggleMode.innerHTML = '<i class="fa-solid fa-sun"></i>'; // sun icon for dark mode
} else {
  document.getElementsByTagName("body")[0].style.backgroundColor = "#f4f4f4";
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
      ? "dark-mode"
      : "light-mode";
    // console.log(themeMode);
    // console.log( document.body.classList);
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


// export default EventHandler;