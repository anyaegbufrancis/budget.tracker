/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/assets/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/assets/js/charts.js":
/*!************************************!*\
  !*** ./public/assets/js/charts.js ***!
  \************************************/
/*! exports provided: populateTotal, populateTable, populateChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"populateTotal\", function() { return populateTotal; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"populateTable\", function() { return populateTable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"populateChart\", function() { return populateChart; });\n/* harmony import */ var _transaction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transaction */ \"./public/assets/js/transaction.js\");\n\nvar myChart;\nfunction populateTotal() {\n  // reduce transaction amounts to a single total value\n  var total = _transaction__WEBPACK_IMPORTED_MODULE_0__[\"transactions\"].reduce(function (total, t) {\n    return total + parseInt(t.value);\n  }, 0);\n  var totalEl = document.querySelector(\"#total\");\n  totalEl.textContent = total;\n}\nfunction populateTable() {\n  var tbody = document.querySelector(\"#tbody\");\n  tbody.innerHTML = \"\";\n  _transaction__WEBPACK_IMPORTED_MODULE_0__[\"transactions\"].forEach(function (transaction) {\n    // create and populate a table row\n    var tr = document.createElement(\"tr\");\n    tr.innerHTML = \"\\n        <td>\".concat(transaction.name, \"</td>\\n        <td>\").concat(transaction.value, \"</td>\\n      \");\n    tbody.appendChild(tr);\n  });\n}\nfunction populateChart() {\n  // copy array and reverse it\n  var reversed = _transaction__WEBPACK_IMPORTED_MODULE_0__[\"transactions\"].slice().reverse();\n  var sum = 0; // create date labels for chart\n\n  var labels = reversed.map(function (t) {\n    var date = new Date(t.date);\n    return \"\".concat(date.getMonth() + 1, \"/\").concat(date.getDate(), \"/\").concat(date.getFullYear());\n  }); // create incremental values for chart\n\n  var data = reversed.map(function (t) {\n    sum += parseInt(t.value);\n    return sum;\n  }); // remove old chart if it exists\n\n  if (myChart) {\n    myChart.destroy();\n  }\n\n  var ctx = document.getElementById(\"myChart\").getContext(\"2d\");\n  myChart = new Chart(ctx, {\n    type: \"line\",\n    data: {\n      labels: labels,\n      datasets: [{\n        label: \"Total Over Time\",\n        fill: true,\n        backgroundColor: \"#6666ff\",\n        data: data\n      }]\n    }\n  });\n}\n\n//# sourceURL=webpack:///./public/assets/js/charts.js?");

/***/ }),

/***/ "./public/assets/js/generateapi.js":
/*!*****************************************!*\
  !*** ./public/assets/js/generateapi.js ***!
  \*****************************************/
/*! exports provided: generatedApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generatedApi\", function() { return generatedApi; });\nvar generatedApi = generateApi();\n\nfunction generateApi() {\n  var create = function create(transaction) {\n    return fetch(\"/api/transaction\", {\n      method: \"POST\",\n      body: JSON.stringify(transaction),\n      headers: {\n        Accept: \"application/json, text/plain, */*\",\n        \"Content-Type\": \"application/json\"\n      }\n    }).then(function (response) {\n      return response.json();\n    });\n  };\n\n  var fetchAll = function fetchAll() {\n    return fetch(\"/api/transaction\").then(function (response) {\n      return response.json();\n    });\n  };\n\n  return Object.freeze({\n    create: create,\n    fetchAll: fetchAll\n  });\n}\n\n//# sourceURL=webpack:///./public/assets/js/generateapi.js?");

/***/ }),

/***/ "./public/assets/js/generateform.js":
/*!******************************************!*\
  !*** ./public/assets/js/generateform.js ***!
  \******************************************/
/*! exports provided: generatedForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generatedForm\", function() { return generatedForm; });\nvar generatedForm = generateForm();\n\nfunction generateForm() {\n  var nameEl = document.querySelector(\"#t-name\");\n  var amountEl = document.querySelector(\"#t-amount\");\n  var errorEl = document.querySelector(\".form .error\");\n\n  var showError = function showError(message) {\n    errorEl.textContent = message;\n  }; // return false if invalid and display validation message\n\n\n  var validation = function validation() {\n    // validate form\n    if (nameEl.value === \"\" || amountEl.value === \"\") {\n      showError(\"Missing Information\");\n      return false;\n    }\n\n    showError(\"\");\n    return true;\n  }; // return transaction object from form input\n\n\n  var transaction = function transaction() {\n    return {\n      name: nameEl.value,\n      value: amountEl.value,\n      date: new Date().toISOString()\n    };\n  }; // clear form inputs\n\n\n  var clear = function clear() {\n    nameEl.value = \"\";\n    amountEl.value = \"\";\n    showError(\"\");\n  };\n\n  return Object.freeze({\n    transaction: transaction,\n    validation: validation,\n    clear: clear,\n    showError: showError\n  });\n}\n\n//# sourceURL=webpack:///./public/assets/js/generateform.js?");

/***/ }),

/***/ "./public/assets/js/index.js":
/*!***********************************!*\
  !*** ./public/assets/js/index.js ***!
  \***********************************/
/*! exports provided: renderTransactionsChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderTransactionsChart\", function() { return renderTransactionsChart; });\n/* harmony import */ var _charts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./charts */ \"./public/assets/js/charts.js\");\n/* harmony import */ var _transaction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transaction */ \"./public/assets/js/transaction.js\");\n\n\nObject(_transaction__WEBPACK_IMPORTED_MODULE_1__[\"initTransactions\"])();\n\ndocument.querySelector(\"#add-btn\").onclick = function () {\n  Object(_transaction__WEBPACK_IMPORTED_MODULE_1__[\"sendTransaction\"])(true);\n};\n\ndocument.querySelector(\"#sub-btn\").onclick = function () {\n  Object(_transaction__WEBPACK_IMPORTED_MODULE_1__[\"sendTransaction\"])(false);\n};\n\nfunction renderTransactionsChart() {\n  Object(_charts__WEBPACK_IMPORTED_MODULE_0__[\"populateTotal\"])();\n  Object(_charts__WEBPACK_IMPORTED_MODULE_0__[\"populateTable\"])();\n  Object(_charts__WEBPACK_IMPORTED_MODULE_0__[\"populateChart\"])();\n}\n\n//# sourceURL=webpack:///./public/assets/js/index.js?");

/***/ }),

/***/ "./public/assets/js/transaction.js":
/*!*****************************************!*\
  !*** ./public/assets/js/transaction.js ***!
  \*****************************************/
/*! exports provided: transactions, sendTransaction, initTransactions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"transactions\", function() { return transactions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sendTransaction\", function() { return sendTransaction; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initTransactions\", function() { return initTransactions; });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./public/assets/js/index.js\");\n/* harmony import */ var _generateform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generateform */ \"./public/assets/js/generateform.js\");\n/* harmony import */ var _generateapi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generateapi */ \"./public/assets/js/generateapi.js\");\n\n\n\nvar transactions = [];\nfunction sendTransaction(isAdding) {\n  if (!_generateform__WEBPACK_IMPORTED_MODULE_1__[\"generatedForm\"].validation()) {\n    return;\n  } // create record\n\n\n  var transaction = _generateform__WEBPACK_IMPORTED_MODULE_1__[\"generatedForm\"].transaction(); // if subtracting funds, convert amount to negative number\n\n  if (!isAdding) {\n    transaction.value *= -1;\n  } // add to beginning of current array of data\n\n\n  transactions.unshift(transaction); // Re-compute and render chart\n\n  Object(_index__WEBPACK_IMPORTED_MODULE_0__[\"renderTransactionsChart\"])(); // also send to server\n\n  _generateapi__WEBPACK_IMPORTED_MODULE_2__[\"generatedApi\"].create(transaction).then(function (data) {\n    if (data.errors) {\n      _generateform__WEBPACK_IMPORTED_MODULE_1__[\"generatedForm\"].showError(\"Enter transaction name &/or amount\");\n    } else {\n      _generateform__WEBPACK_IMPORTED_MODULE_1__[\"generatedForm\"].clear();\n    }\n  })[\"catch\"](function () {\n    // fetch failed, so save in indexed db\n    savetoIndexedDB(transaction);\n    _generateform__WEBPACK_IMPORTED_MODULE_1__[\"generatedForm\"].clear();\n  });\n}\nfunction initTransactions() {\n  _generateapi__WEBPACK_IMPORTED_MODULE_2__[\"generatedApi\"].fetchAll().then(function (data) {\n    // save db data on global variable\n    transactions = data;\n    Object(_index__WEBPACK_IMPORTED_MODULE_0__[\"renderTransactionsChart\"])();\n  });\n}\n\n//# sourceURL=webpack:///./public/assets/js/transaction.js?");

/***/ })

/******/ });