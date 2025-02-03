import { Calculator, AdvanceCalculation } from "./Calculator.js";
import { Error } from "./Error.js";

// immediately invoked function expression (IIFE)
export const CalculatorModule = function () {
    
    // Precedence for erach operators
    const precedence = {
        "+": 1,
        "-": 1,
        "×": 2,
        "÷": 2,
        "^": 3, 
    };

    // scientific functions 
    const scientificFunctions = [
        "sin",
        "cos",
        "tan",
        "log",
        "cube",
        "degree",
        "radian",
        "√",
        "!",
    ];
    
    // constants
    const constants = {
        'π': Math.PI,
        'e': Math.E,
    };

    // This method will check if the input is a number or a constant
    function isNumber(value) {
        return !isNaN(value) || value in constants;
    }

    // Function to tokenize the input expression
    // Basically it will convert expression into tokens array as below example
    // input: "56 + 69 + 9 - 3"
    // output/token: [56, '+', 69, '+', 9, '-', 3]
    function tokenize(expression) {
        const tokens = [];
        let number = "";
        let i = 0;
        
        // it will iterate throught each charavter in the expression
        while (i < expression.length) {
            const char = expression[i];

            if (isNumber(char) || char === ".") {

                // It will handle constants
                if (char in constants) {
                    tokens.push(constants[char]);
                    i++;
                } else {
                    number += char;
                    i++;
                }
            } else if (char === "(" || char === ")") {
                
                // It will handle  parentheses
                if (number) {
                    tokens.push(parseFloat(number));
                    number = "";
                }
                tokens.push(char);
                i++;
            } else if (char in precedence) {

                // It will handle  operators
                if (number) {
                    tokens.push(parseFloat(number));
                    number = "";
                }
                tokens.push(char);
                i++;
            } else {

                // Check for scientific functions
                const functionName = scientificFunctions.find((func) =>
                    expression.startsWith(func, i)
                );
                if (functionName) {
                    if (number) {
                        tokens.push(parseFloat(number));
                        number = "";
                    }
                    tokens.push(functionName);
                    i += functionName.length;
                } else {
                    i++; // It will skip unrecognized characters
                }
            }
        }

        // Push the last number in tokens if exists
        if (number) {
            tokens.push(parseFloat(number));
        }

        if(tokens.length <= '1') {
            return tokens;
        }

        return tokens;
    }

    // Function to convert infix to postfix
    // it will take token and convert it to postfix
    // input: [56, '+', 69, '+', 9, '-', 3]
    // output: [56, 69, '+', 9, '+', 3, '-']
    function infixToPostfix(tokens) {
        const output = [];
        const operators = [];

        // it will iterate through each tokens 
        for (let token of tokens) {
            if (isNumber(token)) {

                // Push numbers directly to the output
                output.push(token); 
            } else if (scientificFunctions.includes(token)) {
                // Push functions to the operator stack
                operators.push(token);
            } else if (token in precedence) {

                // Handle operators
                while (
                    operators.length &&
                    operators[operators.length - 1] !== "(" &&
                    precedence[operators[operators.length - 1]] >= precedence[token]
                ) {
                    output.push(operators.pop()); // pop higher precedence operators
                }
                operators.push(token); // push the current operator
            } else if (token === "(") {
                operators.push(token); // Push '(' to the stack
            } else if (token === ")") {
                // Pop operators until '(' is encountered
                while (operators.length && operators[operators.length - 1] !== "(") {
                    output.push(operators.pop());
                }
                operators.pop(); 
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
    function evaluatePostfix(postfix, selectedMode) {
        const stack = [];
        let result;
        
        for (let token of postfix) {
            if (isNumber(token)) {
                // Push numbers to the stack
                stack.push(token); 
            } else if (scientificFunctions.includes(token)) {
                const a = stack.pop();

                // instance for advance calculation is created 
                let advanceCalculate = new AdvanceCalculation(a)

                // try and catch is used to handle unexpected errir
                try{
                    // based on the token case will be executed
                    switch (token) {
                        case "sin":
                            // chech that selected mode is radian or degree
                            if(selectedMode == 'radian')
                                result = advanceCalculate.sinR();
                            else
                                result = advanceCalculate.sinD();
                            break;
                        case "cos":
                            // chech that selected mode is radian or degree
                            if(selectedMode == 'radian')
                                result = advanceCalculate.cosR();
                            else
                                result = advanceCalculate.cosD();
                            break;
                        case "tan":
                            // chech that selected mode is radian or degree
                            if(selectedMode == 'radian')
                                result = advanceCalculate.tanR();
                            else
                                result = advanceCalculate.tanD();
                            break;
                        case "log":
                            result = advanceCalculate.log10();
                            break;
                        case "√": 
                            result = advanceCalculate.sqrt();
                            break;
                        case "!":
                            result = advanceCalculate.fact();
                            break;
                        default:
                            return Error[3].message;
                    }
                } catch{
                    stack.push(Error[3].message);
                    break;
                }

                // it will check if number is interger or not if not integer then if allow only 10 digits afeter deciamal
                stack.push(Number.isInteger(result) ? result : result.toFixed(10));
            } else {

                const b = stack.pop();
                const a = stack.pop();

                // instance for basic calculation is created 
                let basicCalculate = new Calculator(a,b)

                // try and catch is used to handle unexpected errir
                try {

                    // based on the token case will be executed
                    switch (token) {
                        case "+":
                            result = basicCalculate.add();
                            break;
                        case "-":
                            result = basicCalculate.subtract();
                            break;
                        case "×":
                            result = basicCalculate.multiply();
                            break;
                        case "÷":
                            result = basicCalculate.division();
                            break;
                        case "^":
                            result = basicCalculate.basePower();
                            break;
                        default:
                            return Error[3].message;
                    }
                } catch{
                    // it will throw an error and stop the execution of the code
                    stack.push(Error[3].message);
                    break;
                }
                
                // it will check if number is interger or not if not integer then if allow only 10 digits afeter deciamal
                stack.push(Number.isInteger(result) ? result : result.toFixed(10));
            }
        }

        // final result will be the only last element in the stack
        return stack.pop();
    }

    // public evaluate function
    return {
        evaluate: function (expression, selectedMode='radian') {
            if (expression.trim() === "") {
                return 0;
            }

            // remove any spaces from the expression
            expression = expression.replace(/\s+/g, "");

            // tokenize the expression
            const tokens = tokenize(expression);

            if(expression == tokens){
                return tokens
            }

            // convert infix to postfix
            const postfix = infixToPostfix(tokens);

            // It will evaluate the postfix expression
            return evaluatePostfix(postfix, selectedMode);
        }
    };
}();

