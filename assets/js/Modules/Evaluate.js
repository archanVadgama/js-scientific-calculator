import { Calculator } from "./Calculator.js";
import { Error } from "./Error.js";

//This is a clouser function which is also an IIFE Function that will be used to evaluate the expression based  on the precedency order
export const evaluate = (function () {

    
    // it will perform basic arithmetic
    function calculate(a, b, operator) {
    
        let calculate = new Calculator(a, b);

        switch (operator) {
            case "+":
                return calculate.add();
            case "-":
                return calculate.subtract();
            case "*":
                return calculate.multiply();
            case "/":
                return calculate.division();
            default:
                return Error[3].message;
        }
    }
    
    function signsRules(sign1, sign2) {
        if (sign1 == "+" && sign2 == "+") return "+";
        if (sign1 == "+" && sign2 == "-") return "-";
        if (sign1 == "-" && sign2 == "+") return "-";
        if (sign1 == "-" && sign2 == "-") return "+";
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
            if (!isNaN(char) || char == ".") {
                number += char; // Append each carecter the number(except operator)
            } else {
                // console.log('before ',tokens);
                
                // if (tokens.length > '2' && isNaN(tokens.at(length - 1)) && isNaN(char)) {
                    // let signAns = signsRules(tokens.at(length - 1), char);
                    // console.log('token last element is -> '+tokens.at(length-1));
                    // console.log('char element is -> '+char);
                    // console.log('sign rules answere ### '+ signAns);
                    // console.log('before pop ',tokens);
                    // console.log(' asdasd '+tokens[1]);
                    // console.log(' asdasd '+tokens[2]);
                    // tokens.pop(); // Pop the last operator from token array
                    // console.log('after pop ',tokens);
                    // console.log('after push ',tokens);
                    // tokens.push(signAns); // Push the operator
                    
                // }
                
                if (number) tokens.push(parseFloat(number)); // Push the number
                // console.log('final ',tokens);
                // console.log(tokens, number, char, isNaN(number), isNaN(char));
                tokens.push(char); // Push the operator
                number = "";
            }
        }
        
        if (number) tokens.push(parseFloat(number)); // Push the last number

        // if toeken array is less than one then it will return array and dont perform operation
        if(tokens.length <= '2'){
            return tokens
        }
        
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