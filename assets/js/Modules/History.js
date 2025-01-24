const History = {
    history: JSON.parse(localStorage.getItem("calculation-history")) || [],  // Retrieve history from localStorage (or initialize empty array)

    setHistory(exp, res) {
        // console.log(this.history.at(length-1));

        // Create a new history entry
        const newHistoryEntry = {
            key: this.history?.at(length-1)?.key + 1 || 1,  
            expression: exp,        
            result: res             
        };

        // Append the new history entry to the existing history array
        this.history.push(newHistoryEntry);

        // Update localStorage with the new history array
        localStorage.setItem("calculation-history", JSON.stringify(this.history));

        // return this.history;  
    },

    getHistory() {
        return this.history;  // Retrieve the full history
    },

    formatHistory(){
        return this.history.map((entry, index) => {
            return `${entry.expression} = ${entry.result}`;}).join("\n");
        
    }
};

export { History };
