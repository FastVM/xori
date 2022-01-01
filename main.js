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

/***/ "./source/index.js":
/*!*************************!*\
  !*** ./source/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _term_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./term.js */ \"./source/term.js\");\n/* harmony import */ var _term_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_term_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\n\nconst keymaps = {};\nconst keymap = async(loadKeyMap) => {\n    let ret = keymaps[loadKeyMap];\n    if (ret != null) {\n        return ret;\n    }\n    if (loadKeyMap === 'vim') {\n        ret = await Promise.all(/*! import() */[__webpack_require__.e(\"codemirror\"), __webpack_require__.e(\"vendors-node_modules_codemirror_addon_edit_matchbrackets_js-node_modules_codemirror_addon_sea-315257\"), __webpack_require__.e(\"vendors-node_modules_codemirror_keymap_vim_js\")]).then(__webpack_require__.t.bind(__webpack_require__, /*! codemirror/keymap/vim */ \"./node_modules/codemirror/keymap/vim.js\", 23));\n    } else if (loadKeyMap === 'emacs') {\n        ret = await Promise.all(/*! import() */[__webpack_require__.e(\"codemirror\"), __webpack_require__.e(\"vendors-node_modules_codemirror_keymap_emacs_js\")]).then(__webpack_require__.t.bind(__webpack_require__, /*! codemirror/keymap/emacs */ \"./node_modules/codemirror/keymap/emacs.js\", 23));\n    } else if (loadKeyMap === 'sublime') {\n        ret = await Promise.all(/*! import() */[__webpack_require__.e(\"codemirror\"), __webpack_require__.e(\"vendors-node_modules_codemirror_addon_edit_matchbrackets_js-node_modules_codemirror_addon_sea-315257\"), __webpack_require__.e(\"vendors-node_modules_codemirror_keymap_sublime_js\")]).then(__webpack_require__.t.bind(__webpack_require__, /*! codemirror/keymap/sublime */ \"./node_modules/codemirror/keymap/sublime.js\", 23));\n    }\n    keymaps[loadKeyMap] = ret;\n    return ret;\n}\n\nlet setEditTheme = (theme) => {};\n\n__webpack_require__.e(/*! import() | codemirror */ \"codemirror\").then(__webpack_require__.t.bind(__webpack_require__, /*! codemirror */ \"./node_modules/codemirror/lib/codemirror.js\", 23)).then(async ({ default: CodeMirror }) => {\n    const edVal = CodeMirror.fromTextArea(document.getElementById('editor'), {\n        mode: 'plaintext',\n        theme: 'material-darker',\n        lineNumbers: true,\n        theme: localStorage.getItem('theme.edit') ?? \"dark\",\n    });\n    edVal.setValue(localStorage.getItem('/open.paka'));\n    edVal.on('change', () => {\n        localStorage.setItem('/open.paka', edVal.getValue());\n    });\n    window.ed = () => {\n        return edVal.getValue();\n    };\n    setEditTheme = (theme) => {\n        edVal.setOption('theme', theme);\n    };\n    keymap();\n});\n\nwindow.runit = () => { };\n\nwindow.ed = () => {\n    return document.getElementById('editor').value;\n};\n\nwindow.loadtheme = ({edit, page}) => {\n    if (edit != null) {\n        document.getElementById('edit-style').href = `theme/${edit}.css`;\n        localStorage.setItem('theme.edit', edit);\n        setEditTheme(edit);\n    }\n    if (page != null) {\n        document.getElementById('page-style').href = `static/${page}.css`;\n        localStorage.setItem('theme.page', page);\n    }\n};\n\ndocument.body.onload = () => {\n    const pageTheme = localStorage.getItem('theme.page');\n    if (pageTheme !== 'dark') {\n        loadtheme({page: pageTheme});\n    }\n    const editTheme = localStorage.getItem('theme.edit');\n    if (editTheme !== 'material-darker') {\n        loadtheme({edit: editTheme});\n    }\n\n    const termElem = document.getElementById('terminal');\n\n    let text = '';\n\n    const term = {\n        write: (code) => {\n            const src = String(code);\n            termElem.innerText += src;\n            text += src;\n            localStorage.setItem('page.term.text', text);\n        },\n\n        reset: () => {\n            termElem.innerText = '';\n            text = '';\n            localStorage.setItem('page.term.text', text);\n        }\n    };\n\n    const lastText = localStorage.getItem('page.term.text');\n    if (lastText != null && lastText !== '') {\n        document.getElementById('terminal').innerText = lastText;\n\n        const lastTime = localStorage.getItem('page.head.time');\n        if (lastTime != null) {\n            document.getElementById('time').innerText = lastTime;\n        }\n    }\n    \n    let worker = null;\n    let lastTime = null;\n\n    const nextFrame = () => {\n        if (lastTime != null) {\n            const ms = new Date() - lastTime;\n            localStorage.setItem('page.head.time', ms);\n            document.getElementById('time').innerText = `${ms}ms`;\n            requestAnimationFrame(nextFrame);\n        }\n    };\n\n    const runMsg = async(msg) => {\n        lastTime = new Date();\n        requestAnimationFrame(nextFrame);\n\n        if (worker != null) {\n            worker.terminate();\n        }\n\n        worker = new Worker(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u(\"source_term_js\"), __webpack_require__.b));\n        worker.postMessage(msg);\n        worker.onmessage = ({data: {type, value}}) => {\n            if (type === 'end') {\n                lastTime = null;\n                localStorage.removeItem('vm.save');\n            } else if (type == 'line') {\n                term.write(value);\n                term.write('\\n');\n            } else if (type == 'save') {\n                localStorage.setItem('vm.save', JSON.stringify(value));\n            } else {\n                throw new Error('message error: ' + type);\n            }\n        };\n    };\n\n    const lastSave = localStorage.getItem('vm.save');\n\n    if (lastSave != null) {\n        runMsg({type: 'save', value: lastSave});\n    }\n\n    window.runit = async () => {\n        term.reset();\n        localStorage.setItem('page.term.text', '');\n        let src = ed().replace(/[\\t\\r]+/g, ' ');\n        await runMsg({type: 'src', value: src})\n    };\n};\n\n\n//# sourceURL=webpack://traffic/./source/index.js?");

/***/ }),

/***/ "./source/term.js":
/*!************************!*\
  !*** ./source/term.js ***!
  \************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const minivmMod = __webpack_require__.e(/*! import() | minivm */ \"minivm\").then(__webpack_require__.t.bind(__webpack_require__, /*! ../paka/minivm/minivm.js */ \"./paka/minivm/minivm.js\", 23)).then(async (minivm) => {\n    return minivm;\n});\n\nconst AsyncFunction = Object.getPrototypeOf(async () => { }).constructor;\n\nconst vm_none_t = 'void';\nconst vm_state_t = 'int';\nconst vm_size_t = 'int';\nconst vm_num_t = 'int';\nconst vm_obj_t = 'int';\n\nconst typesLikeArray = [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigUint64Array, BigUint64Array];\n\nconst saveWith = (vm, state) => {\n    return async (out, jsObj) => {\n        const saveArr = async (arr) => {\n            const ret = vm.ccall('vm_api_new', vm_obj_t, [vm_state_t, vm_size_t], [state, arr.length]);\n            for (let i = 0; i < arr.length; i++) {\n                const obj = await save(arr[i]);\n                vm.ccall('vm_api_set', vm_none_t, [vm_state_t, vm_obj_t, vm_size_t, vm_obj_t], [state, ret, i, obj]);\n            }\n            return ret;\n        };\n\n        const saveNum = async (num) => {\n            return vm.ccall('vm_api_of_num', vm_obj_t, [vm_state_t, vm_num_t], [state, num]);\n        }\n\n        const saveNone = async () => {\n            return vm.ccall('vm_api_of_none', vm_obj_t, [vm_state_t], [state]);\n        };\n\n        const save = async (obj) => {\n            if (typeof x === 'string') {\n                return await saveArr(Uint8Array.from(obj).buffer);\n            }\n            if (Array.isArray(obj)) {\n                return await saveArr(obj);\n            }\n            if (typeof obj === 'number') {\n                return await saveNum(obj);\n            }\n            if (obj == null) {\n                return await saveNone();\n            }\n            if (obj instanceof Response) {\n                return await save(await obj.arrayBuffer());\n            }\n            if (obj instanceof ArrayBuffer) {\n                return await save(new Uint8Array(obj));\n            }\n            for (const type of typesLikeArray) {\n                if (obj instanceof type) {\n                    return await saveArr(Array.from(obj));\n                }\n            }\n            throw new Error(`cannot serialize: ${obj}`);\n        };\n\n        const vmObj = await save(jsObj);\n        vm.ccall('vm_api_reset', vm_none_t, [vm_state_t], [state]);\n        vm.ccall('vm_api_stack_set', vm_none_t, [vm_state_t, vm_size_t, vm_obj_t], [state, out, vmObj]);\n    };\n};\n\nconst runState = async(state, vm, todo) => {\n    let rem = 0;\n    while (state !== 0) {\n        if (rem < 0) {\n            rem = 2 ** 20;\n            vm.ccall('vm_api_save', 'void', ['int'], [state]);\n        }\n        rem -= 1;\n        const save = saveWith(vm, state)\n        while (todo.length > 0) {\n            let [out, cur] = todo.pop();\n            const res = await cur();\n            await save(out, res);\n        }\n        state = vm.ccall('vm_run', 'int', ['int'], [state]);\n    }\n    self.postMessage({type: 'end'});\n}\n\nconst runSrc = async (src) => {\n    const { default: create } = await minivmMod;\n\n    let todo = [];\n\n    const args = ['./boot.vm', '-e', `import(\"browser.paka\") ${src}`];\n    const mod = {};\n    mod[\"print\"] = (txt) => {\n        self.postMessage({type: 'line', value: txt});\n    };\n    mod.vm_do_eval_func = (out, str) => {\n        todo.push([out, new AsyncFunction(str)]);\n    };\n    mod.vm_do_saved = (buf) => {\n        self.postMessage({type: 'save', value: buf});\n    };\n\n    mod.vm_do_file_put_func = (str) => { };\n\n    const vm = await create(mod);\n    for (const arg of args) {\n        vm.ccall('vm_main_add_arg', 'void', ['string'], [arg]);\n    }\n    let state = vm.ccall('vm_main_default', 'int', [], []);\n    runState(state, vm, todo);\n};\n\nconst runSave = async (save) => {\n    const { default: create } = await minivmMod;\n\n    let todo = [];\n\n    const mod = {};\n    mod[\"print\"] = (txt) => {\n        self.postMessage({type: 'line', value: txt});\n    };\n    mod.vm_do_eval_func = (out, str) => {\n        todo.push([out, new AsyncFunction(str)]);\n    };\n    mod.vm_do_saved = (buf) => {\n        self.postMessage({type: 'save', value: buf});\n    };\n\n    mod.vm_do_file_put_func = (str) => { };\n\n    const vm = await create(mod);\n    \n    const dataPtr = mod._malloc(save.length);\n    const dataHeap = new Uint8Array(mod.HEAPU8.buffer, dataPtr, save.length);\n    dataHeap.set( new Uint8Array(save) );\n\n    let state = vm.ccall('vm_api_load_save', 'int', ['int', 'pointer'], [save.length, dataPtr]);\n    mod._free(dataPtr);\n\n    runState(state, vm, todo);\n}\n\nself.onmessage = ({data: {type, value}}) => {\n    if (type === 'src') {\n        runSrc(value);\n    } else if (type === 'save') {\n        runSave(JSON.parse(value));\n    } else {\n        throw new Error('err self message: ' + type);\n    }\n};\n\n\n//# sourceURL=webpack://traffic/./source/term.js?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "traffic:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktraffic"] = self["webpackChunktraffic"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./source/index.js");
/******/ 	
/******/ })()
;