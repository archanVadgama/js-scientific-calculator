
class Arithmatic {
    
    add() {
        return this.val1 + this.val2;
    }

    subtract() {
        return this.val1 - this.val2;
    }

    multiply() {
        return this.val1 * this.val2;
    }

    division() {
        if (this.val1 === 0) {
            alert("Cannot divide by zero")
            throw new Error("Cannot divide by zero");
        }
        return this.val1 / this.val2;
    }
}

class Trigo {
    constructor(val1, val2){
        this.val1 = val1;
    }

    sin() {
        const radians = this.val1 * Math.PI / 180;
        return Math.sin(radians);
    }
    static cos(degrees) {
        const radians = degrees * Math.PI / 180;
        return Math.cos(radians);
    }
}
class Calculator extends Arithmatic{
    constructor(val1, val2){
        super()
        this.val1 = val1;
        this.val2 = val2;
    }
}

export { Calculator, Trigo};
// export default Operations; 


