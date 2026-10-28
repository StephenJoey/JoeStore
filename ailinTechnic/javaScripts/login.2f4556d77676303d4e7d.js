/******/ var __webpack_modules__ = ({

/***/ 597
(__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 51 modules
var axios = /*#__PURE__*/__webpack_require__(324);
// EXTERNAL MODULE: ./node_modules/form-serialize/index.js
var form_serialize = __webpack_require__(76);
// EXTERNAL MODULE: ./src/utils/alert.js
var utils_alert = /*#__PURE__*/__webpack_require__(13);
// EXTERNAL MODULE: ./src/utils/request.js
var request = __webpack_require__(542);
;// ./src/login/hotUpdates.js
const hotUpdates = function () {
    if (true) {
        console.log('这行日志不会在生产代码中出现');
    }
    console.log('这行日志只会在开发环境打印');
}

hotUpdates()


;// ./src/login/login.js











if (import.meta.webpackHot) {
    import.meta.webpackHot.accept();
    // 你也可以更精细地接受特定模块的更新：
    // import.meta.webpackHot.accept('./utils/01-test.js', () => {
    //   console.log('01-test.js 模块已热更新');
    // });
}

// 收集手机号码和验证码数据
document.querySelector('.login-btn').addEventListener('click', function (e) {
    e.preventDefault()
    const loginForm = document.querySelector('.login-form')
    const loginData = form_serialize(loginForm, { hash: true, empty: true })
    console.log(loginData)
    if (loginData.mobile.trim().length !== 11) {
        (0,utils_alert/* myAlert */.x)(false, '账号长度必须是11位')
        return
    }

    if (loginData.code.trim().length <= 5) {
        (0,utils_alert/* myAlert */.x)(false, '密码长度不低于6位')
        return
    }

    ;(0,axios/* default */.A)({
        url: '/v1_0/authorizations',
        method: 'POST',
        data: loginData

    }).then(result => {
        ;(0,utils_alert/* myAlert */.x)(true, ` <strong>提示</strong> 登录成功 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`)
        // console.log(result);
        const tokenStr = result.data.token
        localStorage.setItem('token', tokenStr)
        location.href = './content.html'
    }).catch(error => {
        const msg = error.response?.data?.message || '网络异常，请稍后重试'
        ;(0,utils_alert/* myAlert */.x)(false, msg)
    })
})



/***/ }

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ const __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	const cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	const module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/******/ // expose the modules object (__webpack_modules__)
/******/ __webpack_require__.m = __webpack_modules__;
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/chunk loaded */
/******/ (() => {
/******/ 	const deferred = [];
/******/ 	__webpack_require__.O = (result, chunkIds, fn) => {
/******/ 		if(chunkIds) {
/******/ 			deferred.push([chunkIds, fn]);
/******/ 			return;
/******/ 		}
/******/ 		for (var i = 0; i < deferred.length; i++) {
/******/ 			let [chunkIds, fn] = deferred[i];
/******/ 			let fulfilled = true;
/******/ 			for (var j = 0; j < chunkIds.length; j++) {
/******/ 				if (__webpack_require__.O.j(chunkIds[j])) {
/******/ 					chunkIds.splice(j--, 1);
/******/ 				} else {
/******/ 					fulfilled = false;
/******/ 				}
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferred.splice(i--, 1)
/******/ 				const r = fn();
/******/ 				if (r !== undefined) result = r;
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ // define getter/value functions for harmony exports
/******/ __webpack_require__.d = (exports, definition) => {
/******/ 	if(Array.isArray(definition)) {
/******/ 		var i = 0;
/******/ 		while(i < definition.length) {
/******/ 			var key = definition[i++];
/******/ 			var binding = definition[i++];
/******/ 			var descriptor = binding === 0 ? { enumerable: true, value: definition[i++] } : { enumerable: true, get: binding };
/******/ 			if(!__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, descriptor);
/******/ 		}
/******/ 	} else {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	}
/******/ };
/******/ 
/******/ /* webpack/runtime/global */
/******/ __webpack_require__.g = (function() {
/******/ 	if (typeof globalThis === 'object') return globalThis;
/******/ 	try {
/******/ 		return this || new Function('return this')();
/******/ 	} catch (e) {
/******/ 		if (typeof window === 'object') return window;
/******/ 	}
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ // define __esModule on exports
/******/ __webpack_require__.r = (exports) => {
/******/ 	Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 	Object.defineProperty(exports, '__esModule', { value: true });
/******/ };
/******/ 
/******/ /* webpack/runtime/runtimeId */
/******/ __webpack_require__.j = 966;
/******/ 
/******/ /* webpack/runtime/jsonp chunk loading */
/******/ (() => {
/******/ 	// no baseURI
/******/ 	
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 	const installedChunks = {
/******/ 		966: 0
/******/ 	};
/******/ 	
/******/ 	// no chunk on demand loading
/******/ 	
/******/ 	// no prefetching
/******/ 	
/******/ 	// no preloaded
/******/ 	
/******/ 	// no HMR
/******/ 	
/******/ 	// no HMR manifest
/******/ 	
/******/ 	__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 	
/******/ 	// install a JSONP callback for chunk loading
/******/ 	const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 		let [chunkIds, moreModules, runtime] = data;
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0;
/******/ 		if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 		}
/******/ 		if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				installedChunks[chunkId][0]();
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		return __webpack_require__.O(result);
/******/ 	}
/******/ 	
/******/ 	const chunkLoadingGlobal = self["webpackChunkwebpack"] = self["webpackChunkwebpack"] || [];
/******/ 	chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 	chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module depends on other loaded chunks and execution need to be delayed
/******/ let __webpack_exports__ = __webpack_require__.O(undefined, [96,76], () => (__webpack_require__(597)))
/******/ __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 
