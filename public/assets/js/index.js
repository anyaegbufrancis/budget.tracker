import {populateTotal, populateTable, populateChart} from "./charts"
import { sendTransaction,  initTransactions} from "./transaction"

//calls transaction initialization
initTransactions();

//read DOM elements and fire 'on click' events and functions
document.querySelector("#add-btn").onclick = function () {
  sendTransaction(true);
};

document.querySelector("#sub-btn").onclick = function () {
  sendTransaction(false);
};

//Data rendering aggregator for tables, charts and total
export function renderTransactionsChart() {
  populateTotal();
  populateTable();
  populateChart();
}

