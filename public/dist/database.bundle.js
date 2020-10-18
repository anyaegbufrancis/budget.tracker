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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/assets/js/database.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/assets/js/database.js":
/*!**************************************!*\
  !*** ./public/assets/js/database.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//Cater for multiple browsers.\nvar indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;\nvar db; //create IndexedDB instance\n\nvar request = indexedDB.open(\"offlineDB\", 1); //Create Object Store\n\nrequest.onupgradeneeded = function (event) {\n  event.target.result.createObjectStore(\"awaitingSync\", {\n    keyPath: \"id\",\n    autoIncrement: true\n  });\n};\n\nrequest.onerror = function (err) {\n  return console.log(err);\n}; //Test browser status and if online, fire a post action of indexedDb data to server\n\n\nrequest.onsuccess = function (event) {\n  db = event.target.result;\n\n  if (navigator.onLine) {\n    readofflinePost();\n  }\n}; // Store offline DB post to IndexedDB\n\n\nsavetoIndexedDB = function savetoIndexedDB(record) {\n  var transaction = db.transaction(\"awaitingSync\", \"readwrite\");\n  var store = transaction.objectStore(\"awaitingSync\");\n  store.add(record);\n}; //Central function to upload db data to server (database)\n\n\nreadofflinePost = function readofflinePost() {\n  var transaction = db.transaction(\"awaitingSync\", \"readonly\");\n  var store = transaction.objectStore(\"awaitingSync\");\n  var readRequest = store.getAll();\n\n  readRequest.onsuccess = function () {\n    if (readRequest.result.length > 0) {\n      fetch(\"/api/transaction/bulk\", {\n        method: \"POST\",\n        body: JSON.stringify(readRequest.result),\n        headers: {\n          Accept: \"application/json, text/plain, */*\",\n          \"Content-Type\": \"application/json\"\n        }\n      }).then(function (response) {\n        return response.json();\n      }).then(function () {\n        var transaction = db.transaction(\"awaitingSync\", \"readwrite\");\n        var store = transaction.objectStore(\"awaitingSync\");\n        store.clear();\n      });\n    }\n  };\n}; //Check when the app is online and post indexeddb data to server\n\n\nwindow.addEventListener(\"online\", readofflinePost);\n\n//# sourceURL=webpack:///./public/assets/js/database.js?");

/***/ })

/******/ });