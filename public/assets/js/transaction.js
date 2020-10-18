import { renderTransactionsChart } from "./index"
import { generatedForm} from "./generateform"
import { generatedApi } from "./generateapi"


export let transactions = [];


export function sendTransaction(isAdding) {
    if (!generatedForm.validation()) {
      return;
    }
  
    // create record
    const transaction = generatedForm.transaction();
  
    // if subtracting funds, convert amount to negative number
    if (!isAdding) {
      transaction.value *= -1;
    }
  
    // add to beginning of current array of data
    transactions.unshift(transaction);
  
    // Re-compute and render chart
    renderTransactionsChart()
  
    // also send to server
    generatedApi
      .create(transaction)
      .then((data) => {
        if (data.errors) {
          generatedForm.showError("Enter transaction name &/or amount");
        } else {
          generatedForm.clear();
        }
      })
      .catch(() => {
        // fetch failed, so save in indexed db
        savetoIndexedDB(transaction);
        generatedForm.clear();
      });
  }

  export function initTransactions() {
  
    generatedApi.fetchAll()
    .then((data) => {
      // save db data on global variable
      transactions = data;
      renderTransactionsChart();
    });
  }