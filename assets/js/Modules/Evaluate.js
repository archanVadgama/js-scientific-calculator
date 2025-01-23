//This is a clouser function which is also an IIFE Function that will be used to evaluate the expression based  on the precedency order
export const evaluate = (function () {
    // it will perform basic arithmetic
    function calculate(a, b, operator) {
        switch (operator) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return a / b;
            default:
                return "Invalid operator";
        }
    }

    // this will handles the expression evsluation
    return function (expression) {
        const tokens = [];
        let number = "";
        
        if (expression == "") {
            return 0
        }
        // Tokenize the expression
        for (let char of expression) {
            if (!isNaN(char)) {
                number += char; // Accumulate the number
            } else {
                if (number) tokens.push(parseFloat(number)); // Push the number
                // console.log(tokens, number, char, isNaN(number), isNaN(char));
                tokens.push(char); // Push the operator
                number = "";
            }
        }

        if (number) tokens.push(parseFloat(number)); // Push the last number

        // Handle Division and Multiplication First
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === "/" || tokens[i] === "*") {
                const result = calculate(tokens[i - 1], tokens[i + 1], tokens[i]);
                tokens[i - 1] = result; // Replace the left operand with the result
                tokens.splice(i, 2); // Remove the operator and right operand
                i--; // Adjust the index since we've modified the array
            }
        }

        // Handle Addition and Subtraction
        let result = tokens[0];
        for (let i = 1; i < tokens.length; i += 2) {
            result = calculate(result, tokens[i + 1], tokens[i]);
        }

        return result;
    };
})(); //IIFE Function called imediately