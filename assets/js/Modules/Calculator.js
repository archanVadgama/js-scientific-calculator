import { Error } from "./Error.js";

// basic Calculator class
class BasicCalculation {
    
    // It will check the input is number or not
    checkIsNaNBasic(){
        if(!isNaN(this.val1) && !isNaN(this.val2)){
            return true;
        }
        return false;
    }

    // It will perform addt Ition
    add() {
        //this will check input is valid or not if not then return error
        return this.checkIsNaNBasic() ? this.val1 + this.val2 : Error[3].message 
    }
    
    // It will perform subtraction
    subtract() {
        //this will check input is valid or not if not then return error
        return this.checkIsNaNBasic() ? this.val1 - this.val2 : Error[3].message;
    }
    
    //  It will perform multiplication
    multiply() {
        //this will check input is valid or not if not then return error
        return this.checkIsNaNBasic() ? this.val1 * this.val2 : Error[3].message;    
    }
    
    //  It will perform division only if val2 is not zero
    division() {
        if (this.val2 === 0) {
            alert(Error[6].message)
            return Error[2].message;
        }
        return this.checkIsNaNBasic() ? this.val1 / this.val2 : Error[3].message;   
    }
    
    //  It will perform modulo operation
    modulo() {
        //this will check input is valid or not if not then return error
        return this.checkIsNaNBasic() ? this.val1 % this.val2 : Error[3].message;   
    }
    
    //  It will perform base and power operation
    basePower() {
        //this will check input is valid or not if not then return error
        return this.checkIsNaNBasic() ? Math.pow(this.val1, this.val2) : Error[3].message;   
    }
    
}


// advance calculation cllass
class AdvanceCalculation extends BasicCalculation {
    
    constructor(val1){
        super();
        this.val1 = val1;
    }
    
    // It will check the input is number or not if not then return error
    checkIsNaNAdvance(calculationMethod){
        if(!isNaN(this.val1)){
            return calculationMethod
        }
        return Error[3].message;
    }
    
    //sin method used for radien
    sinR() {
        //this will check input is valid or not if not then return error
        return this.checkIsNaNAdvance(Math.sin(this.val1));
    }
    
    //cos method used for radien
    cosR() {
        return this.checkIsNaNAdvance(Math.cos(this.val1));
    }
    
    //tan method used for radien
    tanR() {
        return this.checkIsNaNAdvance(Math.tan(this.val1)); 
    }
    
    //sin method used for degree
    sinD() {
        //  It will convert radian to degree
        const degree = this.val1 * Math.PI / 180;
        return this.checkIsNaNAdvance(Math.sin(degree));
    }
    
    //cos method used for degree
    cosD() {
        //  It will convert radian to degree
        const degree = this.val1 * Math.PI / 180;
        return this.checkIsNaNAdvance(Math.cos(degree));
    }
    
    //tan method used for degree
    tanD() {
        //  It will convert radian to degree
        const degree = this.val1 * Math.PI / 180;
        return this.checkIsNaNAdvance(Math.tan(degree));
    }

    //  It will calculate log value wiht base 10
    log10() {
        return this.checkIsNaNAdvance(Math.log10(this.val1))
    }

    //  It will calculatoe square root
    sqrt() {
        return this.checkIsNaNAdvance(Math.sqrt(this.val1));
    }   
    
    //  It will calculatoe factorial
    fact() {
        let n = this.val1;
        let res = 1;
        for (let i = 1; i <= n; i++) {
            res *= i;
        }
        return res;
    }    
}

// this is main class which extends BasicCalculation class
class Calculator extends BasicCalculation {
    constructor(val1, val2) {
        super();
        
        this.val1 = val1;
        this.val2 = val2;
    }
}

export { Calculator, AdvanceCalculation};


