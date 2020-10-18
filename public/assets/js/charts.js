import { transactions} from "./transaction"

let myChart;

//Function that plots the chart
export function populateTotal() {
    // reduce transaction amounts to a single total value
    const total = transactions.reduce((total, t) => {
      return total + parseInt(t.value);
    }, 0);
  
    const totalEl = document.querySelector("#total");
    totalEl.textContent = total;
  }
  
  export function populateTable() {
    const tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";
  
    transactions.forEach((transaction) => {
      // create and populate a table row
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${transaction.name}</td>
        <td>${transaction.value}</td>
      `;
  
      tbody.appendChild(tr);
    });
  }
  
  export function populateChart() {
    // copy array and reverse it
    const reversed = transactions.slice().reverse();
    let sum = 0;
  
    // create date labels for chart
    const labels = reversed.map((t) => {
      const date = new Date(t.date);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    });
  
    // create incremental values for chart
    const data = reversed.map((t) => {
      sum += parseInt(t.value);
      return sum;
    });
  
    // remove old chart if it exists
    if (myChart) {
      myChart.destroy();
    }
  
    const ctx = document.getElementById("myChart").getContext("2d");
  
    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Total Over Time",
            fill: true,
            backgroundColor: "#6666ff",
            data
          }
        ]
      }
    });
  }
  