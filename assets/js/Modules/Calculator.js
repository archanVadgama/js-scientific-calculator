import { Error as SetError } from "./Error.js";

class BasicCalculation {
    
    //it will perform addtition
    add() {
        if(!isNaN(this.val1) && !isNaN(this.val2)){
            return this.val1 + this.val2;
        }
        return Error[3].message;
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
    
}

class AdvanceCalculation extends BasicCalculation {
    constructor(val1){
        super();
        // Check val1 is numbers
        console.log('advace');
        if (isNaN(val1)) {
            // throw new Error(SetError[3].message);
        }
        this.val1 = val1;
    }

    sinR() {
        return Math.sin(this.val1);
    }
    
    cosR() {
        console.log('test inside');
        return Math.cos(this.val1);
    }

    tanR() {
        return Math.tan(this.val1);
    }

    sinD() {
        const degree = this.val1 * Math.PI / 180;
        return Math.sin(degree);
    }
    
    cosD() {
        const degree = this.val1 * Math.PI / 180;
        return Math.cos(degree);
    }

    tanD() {
        const degree = this.val1 * Math.PI / 180;
        return Math.tan(degree);
    }

    log10() {
        return Math.log10(this.val1)
    }

    sqrt() {
        return Math.sqrt(this.val1);
    }    
}
class Calculator extends AdvanceCalculation {
    constructor(val1, val2) {
        super();
        
        // Check if both val1 and val2 are numbers
        // if (isNaN(val1) || isNaN(val2)) {
        //     console.log("values are ");
        //     console.log(val1);
        //     console.log(val2);
        //     throw new Error(SetError[3].message);
        // }
        
        // Assign values
        this.val1 = val1;
        this.val2 = val2;
    }
}


export { Calculator, AdvanceCalculation};
// export default Operations; 


