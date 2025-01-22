class Arithmatic {
    static add(a, b) {
        return a + b;
    }

    static subtract(a, b) {
        return a - b;
    }

    static multiply(a, b) {
        return a * b;
    }

    static divide(a, b) {
        if (b === 0) {
            // alert("Cannot divide by zero")
            throw new Error("Cannot divide by zero");
        }
        return a / b;
    }
}

class Trigo {
}

export { Arithmatic, Trigo};
// export default Operations; 
