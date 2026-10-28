/******/ var __webpack_modules__ = ({

/***/ 726
(__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = /*#__PURE__*/__webpack_require__(324);
/* harmony import */ var form_serialize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76);
/* harmony import */ var _utils_alert_js__WEBPACK_IMPORTED_MODULE_2__ = /*#__PURE__*/__webpack_require__(13);
/* harmony import */ var _utils_request_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(542);
/* harmony import */ var _utils_auth_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(149);










// 加载文章频道
async function setChannelList() {
    const res = await (0,axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)({ url: '/v1_0/channels' })
    const htmlStr = `<option value="" selected>请选择文章频道</option>` + res.data.channels.map(item => {
        return `<option value="${item.id}">${item.name}</option>`
    }).join('')
    document.querySelector('.channel-select').innerHTML = htmlStr
}
setChannelList()

const queryObj = {
    status: '',
    channel_id: '',
    page: 1,
    per_page: 4
}
let totalCount = null

async function queryListInfo() {
    const responseQuery = await (0,axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)({
        url: '/v1_0/mp/articles',
        method: 'GET',
        params: queryObj
    })
    const responseArry = responseQuery.data.results
    totalCount = responseQuery.data.total_count
    updatePageBtnState()
    document.querySelector('.list-info-total').innerHTML = `共${Math.ceil(totalCount / queryObj.per_page)}页`

    const articleInfo = responseArry.map(item => {
        return `
        <tr>
            <td>
                <img src="${item.cover.type === 0 ? `/assets/Hnat Logo/LOGO小.png` : item.cover.images[0]}" alt="封面" class="cover-img">
            </td>
            <td class="article-title">${item.title}</td>
            <td>
                ${item.status === 1 ? `<span class="status-badge status-pending">待审核</span>` : `<span class="status-badge status-approved">审核通过</span>`}
            </td>
            <td>${item.pubdate}</td>
            <td>${item.read_count}</td>
            <td>${item.comment_count}</td>
            <td>${item.like_count}</td>
            <td data-id="${item.id}">
                <div class="action-btns">
                    <button class="icon-btn edit-btn" title="编辑">✏️</button>
                    <button class="icon-btn delete-btn" title="删除">🗑️</button>
                </div>
            </td>
        </tr>
        `
    }).join('')
    document.querySelector('.article-info').innerHTML = articleInfo
}
queryListInfo()

function filterInfo() {
    document.querySelectorAll('.form-check-input').forEach(item => {
        item.addEventListener('change', function (e) {
            queryObj.status = e.target.value
        })
    })
    document.querySelector('.channel-select').addEventListener('change', function (e) {
        queryObj.channel_id = e.target.value
    })
    document.querySelector('.filter-btn').addEventListener('click', function () {
        queryObj.page = 1 // 筛选时重置回第一页
        queryListInfo()
    })
}
filterInfo()

function updatePageBtnState() {
    const currentPage = queryObj.page || 1
    const totalPage = Math.ceil(totalCount / queryObj.per_page)
    document.querySelector('.page-up').disabled = currentPage <= 1
    document.querySelector('.page-down').disabled = currentPage >= totalPage
}

function turnPage() {
    document.querySelector('.page-down').addEventListener('click', function () {
        if (queryObj.page < Math.ceil(totalCount / queryObj.per_page)) {
            queryObj.page++
            document.querySelector('.page-info-now').innerHTML = `第 ${queryObj.page} 页`
            queryListInfo()
        }
    })
    document.querySelector('.page-up').addEventListener('click', function () {
        if (queryObj.page > 1) {
            queryObj.page--
            document.querySelector('.page-info-now').innerHTML = `第 ${queryObj.page} 页`
            queryListInfo()
        }
    })
}
turnPage()

function deleteItem() {
    document.querySelector('.article-info').addEventListener('click', async function (e) {
        try {
            if (e.target.classList.contains('delete-btn')) {
                const currentID = e.target.closest('[data-id]').dataset.id
                await (0,axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)({
                    url: `/v1_0/mp/articles/${currentID}`,
                    method: 'DELETE',
                })
                const trLength = document.querySelector('.article-info').children.length
                if (trLength === 1 && queryObj.page !== 1) {
                    queryObj.page--
                    document.querySelector('.page-info-now').innerHTML = `第 ${queryObj.page} 页`
                }
                queryListInfo()
                ;(0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_2__/* .myAlert */ .x)(true, '删除成功')
            }
        } catch (error) {
            console.dir(error)
        }
    })
}
deleteItem()

// 设置编辑跳转（跳转到 edit.html）
document.querySelector('.article-table').addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-btn')) {
        const itemId = e.target.closest('[data-id]').dataset.id
        location.href = `./edit.html?id=${itemId}` // 👈 注意这里改成了 edit.html
    }
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
/******/ __webpack_require__.j = 854;
/******/ 
/******/ /* webpack/runtime/jsonp chunk loading */
/******/ (() => {
/******/ 	// no baseURI
/******/ 	
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 	const installedChunks = {
/******/ 		854: 0
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
/******/ let __webpack_exports__ = __webpack_require__.O(undefined, [96,76], () => (__webpack_require__(726)))
/******/ __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 
