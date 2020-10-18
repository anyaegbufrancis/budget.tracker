export const generatedForm = generateForm();

//Fnction that creates form

function generateForm () {
    const nameEl = document.querySelector("#t-name");
    const amountEl = document.querySelector("#t-amount");
    const errorEl = document.querySelector(".form .error");
  
    const showError = (message) => {
      errorEl.textContent = message;
    };
  
    // return false if invalid and display validation message
    const validation = () => {
      // validate form
      if (nameEl.value === "" || amountEl.value === "") {
        showError("Missing Information");
        return false;
      }
      showError("");
      return true;
    };
  
    // return transaction object from form input
    const transaction = () => {
      return {
        name: nameEl.value,
        value: amountEl.value,
        date: new Date().toISOString()
      };
    };
  
    // clear form inputs
    const clear = () => {
      nameEl.value = "";
      amountEl.value = "";
      showError("");
    };
  
    return Object.freeze({ transaction, validation, clear, showError });
  }