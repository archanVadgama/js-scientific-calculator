import { Calculator } from "./Calculator.js";
import { Error } from "./Error.js";

// Define precedence for operators
const precedence = {
    '+': 1,
    '-': 1,
    '×': 2,
    '÷': 2,
    '^': 3, // Exponentiation has higher precedence
};

// Supported scientific functions and constants
const scientificFunctions = ['sin', 'cos', 'tan', 'log', 'sqrt', 'exp', 'root', 'square', 'degree', 'radian'];
const constants = {
    'π': Math.PI,
    'e': Math.E,
};

// Function to check if the input is a number or a constant
function isNumber(value) {
    return !isNaN(value) || value in constants;
}

// Function to tokenize the input expression
function tokenize(expression) {
    const tokens = [];
    let number = "";
    let i = 0;

    while (i < expression.length) {
        const char = expression[i];

        if (isNumber(char) || char === '.') {
            number += char; // Build the number as a string
            i++;
        } else if (char in constants) {
            tokens.push(constants[char]); // Push the constant value
            i++;
        } else if (char === '(' || char === ')') {
            if (number) {
                tokens.push(parseFloat(number));
                number = "";
            }
            tokens.push(char);
            i++;
        } else if (char in precedence) {
            if (number) {
                tokens.push(parseFloat(number));
                number = "";
            }
            tokens.push(char);
            i++;
        } else {
            // Check for scientific functions
            const functionName = scientificFunctions.find(func => expression.startsWith(func, i));
            if (functionName) {
                if (number) {
                    tokens.push(parseFloat(number));
                    number = "";
                }
                tokens.push(functionName);
                i += functionName.length;
            } else {
                i++; // Skip unrecognized characters
            }
        }
    }

    // Push the last number if exists
    if (number) {
        tokens.push(parseFloat(number));
    }

    return tokens;
}

// Function to convert infix to postfix using the Shunting Yard algorithm
function infixToPostfix(tokens) {
    const output = [];
    const operators = [];

    for (let token of tokens) {
        if (isNumber(token)) {
            output.push(token); // Push numbers directly to the output
        } else if (scientificFunctions.includes(token)) {
            operators.push(token); // Push functions to the operator stack
        } else if (token in precedence) {
            // Handle operators
            while (
                operators.length &&
                operators[operators.length - 1] !== '(' &&
                precedence[operators[operators.length - 1]] >= precedence[token]
            ) {
                output.push(operators.pop()); // Pop higher precedence operators
            }
            operators.push(token); // Push the current operator
        } else if (token === '(') {
            operators.push(token); // Push '(' to the stack
        } else if (token === ')') {
            // Pop operators until '(' is encountered
            while (operators.length && operators[operators.length - 1] !== '(') {
                output.push(operators.pop());
            }
            operators.pop(); // Remove the '('
            if (scientificFunctions.includes(operators[operators.length - 1])) {
                output.push(operators.pop()); // Push the function to the output
            }
        }
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

    for (let token of postfix) {
        if (isNumber(token)) {
            stack.push(token); // Push numbers to the stack
        } else if (scientificFunctions.includes(token)) {
            // Handle scientific functions
            const a = stack.pop();
            let result;
            switch (token) {
                case 'sin':
                    result = Math.sin(a);
                    break;
                case 'cos':
                    result = Math.cos(a);
                    break;
                case 'tan':
                    result = Math.tan(a);
                    break;
                case 'log':
                    result = Math.log10(a);
                    break;
                case 'sqrt':
                    result = Math.sqrt(a);
                    break;
                case 'exp':
                    result = Math.exp(a);
                    break;
                case 'root':
                    const b = stack.pop();
                    result = Math.pow(b, 1 / a); // a-th root of b
                    break;
                case 'square':
                    result = Math.pow(a, 2);
                    break;
                case 'degree':
                    result = (a * 180) / Math.PI; // Convert radians to degrees
                    break;
                case 'radian':
                    result = (a * Math.PI) / 180; // Convert degrees to radians
                    break;
                default:
                    return Error[3].message;
            }
            stack.push(result);
        } else {
            // Handle basic arithmetic operations
            const b = stack.pop();
            const a = stack.pop();
            let result;
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
                case "^":
                    result = Math.pow(a, b); // Exponentiation
                    break;
                default:
                    return Error[3].message;
            }
            stack.push(result);
        }
    }

    // The final result will be the only element left in the stack
    return stack.pop();
}

// Main evaluator function
export const evaluate = function (expression) {
    if (expression.trim() === "") {
        return 0; // If the expression is empty, return 0
    }

    // Remove any spaces from the expression
    expression = expression.replace(/\s+/g, "");

    // Tokenize the expression
    const tokens = tokenize(expression);

    // Convert infix to postfix
    const postfix = infixToPostfix(tokens);

    // Evaluate the postfix expression
    return evaluatePostfix(postfix);
};