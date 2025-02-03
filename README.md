# JavaScript Scientific Calculator

A fully functional scientific calculator built using HTML, CSS, and JavaScript. It supports both basic and advanced mathematical calculations, including trigonometric, logarithmic, and exponential functions. It also offers a memory and history functionality, along with a modern user interface and theme toggling between light and dark modes.

## Technologies Used
- **HTML**
- **CSS**
- **JavaScript**

## File Structure

- assets  
    - images (containse sreenshot images)
    - css  
        - style.css  (Contains all the styles for the calculator)  
    - js  
      - Modules  
        - Calculator.js  (Contains all the classes and methods for basic and advanced calculations)  
        - Error.js  (Contains all the error messages and error checking methods)  
        - Evaluate.js  (Contains the logic where the input string is evaluated and the operation is performed)  
        - EventHandlers.js  (Contains all the event handlers for button clicks and keyboard input)  
        - History.js  (Contains all objects related to history, such as setting, getting, and clearing history)  
        - ThemeMode.js  (Contains logic for toggling between light and dark themes)  
        - Toast.js  (Contains the logic for displaying toast messages)  
      - script.js  (Contains all the logic for handling interactions on the page)  
- index.html  (The main HTML file to load the calculator)  
- readme.md  (This README file)

## Screenshots
#### Normal
![Normal](https://raw.githubusercontent.com/archanVadgama/js-scientific-calculator/refs/heads/developing/assets/images/laptop.png?token=GHSAT0AAAAAAC5LSLEXKEBXP2SX4ZMKPVUGZ5A3AEQ)

#### With History UI 
![With History UI](https://raw.githubusercontent.com/archanVadgama/js-scientific-calculator/refs/heads/developing/assets/images/laptop_with_history.png?token=GHSAT0AAAAAAC5LSLEWS3LVWCNMCON5Z3FSZ5A3BGA)

## Concepts Covered
- Created separate modules for each mathematical operation
- Applied **IIFE** (Immediately Invoked Function Expressions)
- Used **Object-Oriented Programming** (OOP) principles
- **Prototype** inheritance
- Implemented **Event Listeners** and **Event Delegation**
- Worked with **`this` keyword**, **scope chain**, and **closures**
- Understood **hoisting** and the **call stack**

## Features
- **Basic calculator functionality** (addition, subtraction, multiplication, division)
- **Scientific calculator functionality** (trigonometric, logarithmic, and exponential functions)
- **Memory functionality** (save and recall results)
- **History functionality** (view and clear previous calculations)
- **Full history** (detailed log of all past calculations)
- **Clear history** (reset stored history)
- **Trigonometric functions** (`sin()`, `cos()`, `tan()`)
- **Exponential functions** (`e`, `π`)
- **Logarithmic functions** (`log()`)
- **Toggle mode** between **dark mode** and **light mode**
- **Modern UI** with a responsive design
- **Toast messages** for user feedback
- Supports **keyboard input** and **button click events** on the calculator
- **Error handling** for invalid inputs or operations

## Supported Calculations

### Basic Calculations:
- `56 + 6`
- `59 - 65`
- `9 * 5`
- `9 / 5`
- `2^3` (Exponentiation)
- `sin(58)`
- `cos(45)`
- `tan(35)`
- `log(20)`

### Advanced Calculations:
- `56 + 69 + 9 - 3`
- `78 + 90 × 4 - 2 ÷ 23 % 100`
- `cos( 45 × 78 × sin( 89 - 9 ) )`

