/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./source/term.js":
/*!************************!*\
  !*** ./source/term.js ***!
  \************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const minivmMod = __webpack_require__.e(/*! import() | minivm */ \"minivm\").then(__webpack_require__.t.bind(__webpack_require__, /*! ../paka/minivm/minivm.js */ \"./paka/minivm/minivm.js\", 23)).then(async (minivm) => {\n    return minivm;\n});\n\nconst AsyncFunction = Object.getPrototypeOf(async () => { }).constructor;\n\nconst vm_none_t = 'void';\nconst vm_state_t = 'int';\nconst vm_size_t = 'int';\nconst vm_num_t = 'int';\nconst vm_obj_t = 'int';\n\nconst typesLikeArray = [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigUint64Array, BigUint64Array];\n\nconst saveWith = (vm, state) => {\n    return async (out, jsObj) => {\n        const saveArr = async (arr) => {\n            const ret = vm.ccall('vm_api_new', vm_obj_t, [vm_state_t, vm_size_t], [state, arr.length]);\n            for (let i = 0; i < arr.length; i++) {\n                const obj = await save(arr[i]);\n                vm.ccall('vm_api_set', vm_none_t, [vm_state_t, vm_obj_t, vm_size_t, vm_obj_t], [state, ret, i, obj]);\n            }\n            return ret;\n        };\n\n        const saveNum = async (num) => {\n            return vm.ccall('vm_api_of_num', vm_obj_t, [vm_state_t, vm_num_t], [state, num]);\n        }\n\n        const saveNone = async () => {\n            return vm.ccall('vm_api_of_none', vm_obj_t, [vm_state_t], [state]);\n        };\n\n        const save = async (obj) => {\n            if (typeof x === 'string') {\n                return await saveArr(Uint8Array.from(obj).buffer);\n            }\n            if (Array.isArray(obj)) {\n                return await saveArr(obj);\n            }\n            if (typeof obj === 'number') {\n                return await saveNum(obj);\n            }\n            if (obj == null) {\n                return await saveNone();\n            }\n            if (obj instanceof Response) {\n                return await save(await obj.arrayBuffer());\n            }\n            if (obj instanceof ArrayBuffer) {\n                return await save(new Uint8Array(obj));\n            }\n            for (const type of typesLikeArray) {\n                if (obj instanceof type) {\n                    return await saveArr(Array.from(obj));\n                }\n            }\n            throw new Error(`cannot serialize: ${obj}`);\n        };\n\n        const vmObj = await save(jsObj);\n        vm.ccall('vm_api_reset', vm_none_t, [vm_state_t], [state]);\n        vm.ccall('vm_api_stack_set', vm_none_t, [vm_state_t, vm_size_t, vm_obj_t], [state, out, vmObj]);\n    };\n};\n\nconst runState = async (state, vm, todo) => {\n    let rem = 0;\n    while (state !== 0) {\n        if (rem < 0) {\n            rem = 2 ** 20;\n            vm.ccall('vm_api_save', 'void', ['int'], [state]);\n        }\n        rem -= 1;\n        const save = saveWith(vm, state)\n        while (todo.length > 0) {\n            let [out, cur] = todo.pop();\n            const res = await cur();\n            await save(out, res);\n        }\n        state = vm.ccall('vm_run', 'int', ['int'], [state]);\n    }\n    self.postMessage({ type: 'end' });\n}\n\nconst runSrc = async (src) => {\n    const { default: create } = await minivmMod;\n\n    let todo = [];\n\n    const args = ['./boot.vm', '-e', `import(\"browser.paka\") ${src}`];\n    const mod = {};\n    mod[\"print\"] = (txt) => {\n        self.postMessage({ type: 'line', value: txt });\n    };\n    mod.vm_do_eval_func = (out, str) => {\n        todo.push([out, new AsyncFunction(str)]);\n    };\n    mod.vm_do_saved = (buf) => {\n        self.postMessage({ type: 'save', value: buf });\n    };\n\n    mod.vm_do_file_put_func = (str) => { };\n\n    const vm = await create(mod);\n    for (const arg of args) {\n        vm.ccall('vm_main_add_arg', 'void', ['string'], [arg]);\n    }\n    let state = vm.ccall('vm_main_default', 'int', [], []);\n    runState(state, vm, todo);\n};\n\nconst runSave = async (save) => {\n    const { default: create } = await minivmMod;\n\n    let todo = [];\n\n    const mod = {};\n    mod[\"print\"] = (txt) => {\n        self.postMessage({ type: 'line', value: txt });\n    };\n    mod.vm_do_eval_func = (out, str) => {\n        todo.push([out, new AsyncFunction(str)]);\n    };\n    mod.vm_do_saved = (buf) => {\n        self.postMessage({ type: 'save', value: buf });\n    };\n\n    mod.vm_do_file_put_func = (str) => { };\n\n    const vm = await create(mod);\n\n    const dataPtr = mod._malloc(save.length);\n    const dataHeap = new Uint8Array(mod.HEAPU8.buffer, dataPtr, save.length);\n    dataHeap.set(new Uint8Array(save));\n\n    let state = vm.ccall('vm_api_load_save', 'int', ['int', 'pointer'], [save.length, dataPtr]);\n    mod._free(dataPtr);\n\n    runState(state, vm, todo);\n}\n\nself.onmessage = async ({ data: { type, value } }) => {\n    try {\n        if (type === 'src') {\n            await runSrc(value);\n        } else if (type === 'save') {\n            await runSave(JSON.parse(value));\n        } else {\n            throw new Error('err self message: ' + type);\n        }\n    } catch (e) {\n        self.postMessage({type: 'end'});\n    }\n};\n\n\n//# sourceURL=webpack://traffic/./source/term.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"source_term_js": 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktraffic"] = self["webpackChunktraffic"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./source/term.js");
/******/ 	
/******/ })()
;