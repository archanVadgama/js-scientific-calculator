import { showToast } from "./Toast.js";

// Function to initialize the theme based on local storage
export function initializeTheme() {
    let toggleMode = document.querySelector(".toogle-mode");
    
    // Check the saved theme mode from localStorage or default to light mode
    const themeMode = localStorage.getItem("theme-mode") === "dark-mode"
      ? "dark-mode"
      : "light-mode";
    
    // Set the initial theme based on the saved mode
    if (themeMode === "dark-mode") {
      toggleMode.innerHTML = '<i class="fa-solid fa-sun"></i>'; // sun icon for dark mode
      document.body.style.backgroundColor = "#1b1c1d";
      document.getElementsByClassName("calculator")[0].style.backgroundColor = "#1b1c1d";
    } else {
      document.body.style.backgroundColor = "#f4f4f4";
      document.getElementsByClassName("calculator")[0].style.backgroundColor = "#fff";
      toggleMode.innerHTML = '<i class="fa-solid fa-moon"></i>'; // moon icon for light mode
    }
    
    // Ensure the element exists before adding event listeners
    if (toggleMode) {
      // Apply the saved theme
      const savedTheme = localStorage.getItem("theme-mode");
      if (savedTheme && savedTheme === "dark-mode") {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.add("light-mode");
      }
  
      // Add event listener for toggling the theme
      toggleMode.addEventListener("click", function () {
        const themeMode = document.body.classList.contains("dark-mode")
          ? "light-mode"
          : "dark-mode";
        
        // Change the UI for dark or light mode
        if (themeMode === "dark-mode") {
          this.innerHTML = '<i class="fa-solid fa-sun"></i>'; // sun icon for dark mode
          document.body.style.backgroundColor = "#1b1c1d";
          document.getElementsByClassName("calculator")[0].style.backgroundColor = "#1b1c1d";
        } else {
          this.innerHTML = '<i class="fa-solid fa-moon"></i>'; // moon icon for light mode
          document.body.style.backgroundColor = "#f4f4f4";
          document.getElementsByClassName("calculator")[0].style.backgroundColor = "#fff";
        }
        
        // Call showToast function if necessary (ensure showToast is available)
        showToast(`Change to ${themeMode}`);
        
        // Toggle class and update localStorage
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme-mode", themeMode);
      });
    }
  }
  
  // Function to open the history popup
  export function openHistoryPopup() {
    document.getElementById("history-btn").addEventListener("click", function () {
      document.getElementById("full-history-container").style.display = "block";
    });
  }
  
  // Function to close the history popup
  export function closeHistoryPopup() {
    document.getElementById("close-btn").addEventListener("click", function () {
      document.getElementById("full-history-container").style.display = "none";
    });
  }
  