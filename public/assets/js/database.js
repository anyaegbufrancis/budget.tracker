
//Cater for multiple browsers.
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

let db;

//create IndexedDB instance
const request = indexedDB.open("offlineDB", 1);

//Create Object Store
request.onupgradeneeded = (event) => {
  event.target.result.createObjectStore("awaitingSync", { keyPath: "id", autoIncrement: true });
};

request.onerror = (err) => console.log(err);

//Test browser status and if online, fire a post action of indexedDb data to server
request.onsuccess = (event) => {
 db = event.target.result;
  if (navigator.onLine) {
    readofflinePost();
  }
};

// Store offline DB post to IndexedDB

savetoIndexedDB = record => {
  const transaction = db.transaction("awaitingSync", "readwrite");
  const store = transaction.objectStore("awaitingSync");
  store.add(record);
}

//Central function to upload db data to server (database)
readofflinePost = () => {
  const transaction = db.transaction("awaitingSync", "readonly");
  const store = transaction.objectStore("awaitingSync");
  const readRequest = store.getAll();

  readRequest.onsuccess = () => {
    if (readRequest.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(readRequest.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
        .then((response) => response.json())
        .then(() => {
          const transaction = db.transaction("awaitingSync", "readwrite");
          const store = transaction.objectStore("awaitingSync");
          store.clear();
        });
    }
  };
}

//Check when the app is online and post indexeddb data to server
window.addEventListener("online",readofflinePost);
