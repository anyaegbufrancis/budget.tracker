export const generatedApi = generateApi();

//function that generates api post with transaction data
function generateApi() {
    const create = (transaction) => {
      return fetch("/api/transaction", {
        method: "POST",
        body: JSON.stringify(transaction),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      }).then((response) => {
        return response.json();
      });
    };
  
    const fetchAll = () => {
      return fetch("/api/transaction").then((response) => {
        return response.json();
      });
    };
    return Object.freeze({ create, fetchAll });
  }


 