import { Calculator } from "./Calculator.js";
import { Error } from "./Error.js";

// Define precedence for operators
const precedence = {
    '+': 1,
    '-': 1,
    '×': 2,
    '÷': 2
};

// Function to check if the input is a number
function isNumber(value) {
    return !isNaN(value) && typeof value !== 'boolean';
}

// Function to convert infix to postfix
function infixToPostfix(expression) {
    const output = [];
    const operators = [];

    let number = "";

    // Loop through the characters in the expression
    for (let char of expression) {
        if (isNumber(char) || char === ".") {
            number += char;  // Build the number as a string
        } else {
            if (number) {
                output.push(parseFloat(number));  // Push the number to the output array
                number = "";  // Reset the number string
            }
            if (char === '(') {
                operators.push(char);  // Push '(' onto the operator stack
            } else if (char === ')') {
                // Pop operators until '(' is encountered
                while (operators.length && operators[operators.length - 1] !== '(') {
                    output.push(operators.pop());
                }
                operators.pop();  // Remove the '('
            } else if (precedence[char]) {
                // Operator found
                while (operators.length && precedence[operators[operators.length - 1]] >= precedence[char]) {
                    output.push(operators.pop());  // Pop operators with higher or equal precedence
                }
                operators.push(char);  // Push the current operator onto the stack
            }
        }
    }

    // Push the last number if exists
    if (number) {
        output.push(parseFloat(number));
    }

    // Pop all remaining operators
    while (operators.length) {
        output.push(operators.pop());
    }

    return output;
}

// Function to evaluate postfix expression
function evaluatePostfix(postfix) {
    const stack = [];

    console.log("Postfix is +++ "+postfix);
    for (let token of postfix) {
        if (isNumber(token)) {
            stack.push(token);  // Push number to the stack
            console.log("Stack 1 is +++ "+stack);
        } else {
            const b = stack.pop();
            const a = stack.pop();
            let result;
            console.log("Token is +++ "+token);
            console.log("A is +++ "+a);
            console.log("B is +++ "+b);
            // Perform the operation based on the operator
            switch (token) {
                case "+":
                    result = new Calculator(a, b).add();
                    break;
                case "-":
                    result = new Calculator(a, b).subtract();
                    break;
                case "×":
                    result = new Calculator(a, b).multiply();
                    break;
                case "÷":
                    result = new Calculator(a, b).division();
                    break;
                default:
                    return Error[3].message;
            }
            console.log("result --- "+result);
            console.log("Stack 2 is +++ "+stack);
            // Check if result is a decimal and format it
            // result = (result - Math.floor(result)) !== 0 ? result.toFixed(2) : result;
            stack.push(result);  // Push the result to the stack
        }
    }

    // The final result will be the only element left in the stack
    return stack.pop();
}

// Main evaluator function
export const evaluate = function (expression) {
    if (expression.trim() === "") {
        return 0;  // If the expression is empty, return 0
    }

    // Remove any spaces from the expression
    expression = expression.replace(/\s+/g, "");

    // Convert infix to postfix
    const postfix = infixToPostfix(expression);

    // Evaluate the postfix expression
    return evaluatePostfix(postfix);
};
