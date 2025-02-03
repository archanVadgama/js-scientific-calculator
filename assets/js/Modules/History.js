
const historyTextarea = document.getElementById("history");
const fullHistoryTextarea = document.getElementById("full-history");
const MIN_TEXTAREA_HEIGHT = 28;
const MAX_TEXTAREA_HEIGHT = 70;

const History = {

    // htis will get the history from the local-stortage
    history: JSON.parse(localStorage.getItem("calculation-history")) || [],  // Retrieve history from localStorage (or initialize empty array)

    setHistory(exp, res) {
        // create a new history entry
        const newHistoryEntry = {
            key: this.history?.at(length-1)?.key + 1 || 1,  // Get the key of the last entry in the history (or 1 if it empty)
            expression: exp,        
            result: res             
        };

        // Append the new history entry to the existing history
        this.history.push(newHistoryEntry);

        // Update localStorage with the new history
        localStorage.setItem("calculation-history", JSON.stringify(this.history));

    },

    getHistory() {
        return this.history;  // retrieve the full history
    },

    formatHistory() {
        return this.history
            .map(entry => `<div style="padding-bottom:10px; margin-bottom:-10px; border-bottom: rgb(204, 202, 202) 1px solid;"><span class="font-medium">${entry.expression}</span> = <span class="answere">${entry.result}</span></div>`)  // Format entries
            .join("<br>");  // join with <br> (new line)
    },

    clearHistory() {
        // it wll clear all history
        localStorage.removeItem('calculation-history')
    },
    
    //this will be used to set history in the textarea
    setHistoryUI() {
        if (History.getHistory().length > 0) {
          document.getElementById("history-btn").style.display = "block";
          let newTextareaHeight =
            MIN_TEXTAREA_HEIGHT * (History.getHistory().length + 1);
      
          if (newTextareaHeight > MAX_TEXTAREA_HEIGHT) {
            historyTextarea.style.height = MAX_TEXTAREA_HEIGHT + "px";
          } else {
            historyTextarea.style.height = newTextareaHeight + "px";
          }
      
          historyTextarea.style.paddingBottom = "10px";
          historyTextarea.innerHTML = History.formatHistory();
          historyTextarea.style.display = "block";
          historyTextarea.scrollTop = historyTextarea.scrollHeight;
          fullHistoryTextarea.innerHTML = History.formatHistory();
          fullHistoryTextarea.style.paddingRight = "5px";
          fullHistoryTextarea.scrollTop = fullHistoryTextarea.scrollHeight;
        } else {
          document.getElementById("history-btn").style.display = "none";
        }
      }
};

export { History };
