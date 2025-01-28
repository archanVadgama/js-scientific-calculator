import { Error } from "./Error.js";

class Arithmatic {
    
    //it will perform addtition
    add() {
        return this.val1 + this.val2;
    }

    //it will perform subtraction
    subtract() {
        return this.val1 - this.val2;
    }

    // it will perform multiplication
    multiply() {
        return this.val1 * this.val2;
    }

    // it will perform division only if val2 is not zero
    division() {
        if (this.val2 === 0) {
            alert(Error[6].message)
            return Error[2].message;
            // throw new Error("Cannot divide by zero");
        }
        return this.val1 / this.val2;
    }

    // it will perform modulo operation
    modulo() {
        return this.val1 % this.val2;
    }
    
    square(){
        return this.val1 * this.val1;
    }
    
    cube(){
        return this.val1 * this.val1 * this.val1;
    }
}

class AdvanceCalculation {
    constructor(val1){
        this.val1 = val1;
    }

    sin() {
        const radians = this.val1 * Math.PI / 180;
        return Math.sin(radians);
    }
    
    cos() {
        const radians = degrees * Math.PI / 180;
        return Math.cos(radians);
    }

    tan() {
        const radians = degrees * Math.PI / 180;
        return Math.tan(radians);
    }
}
class Calculator extends Arithmatic{
    constructor(val1, val2){
        super()
        this.val1 = val1;
        this.val2 = val2;
    }
}

export { Calculator, AdvanceCalculation};
// export default Operations; 


