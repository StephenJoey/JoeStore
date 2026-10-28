/******/ var __webpack_modules__ = ({

/***/ 768
(__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = /*#__PURE__*/__webpack_require__(324);
/* harmony import */ var form_serialize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76);
/* harmony import */ var _utils_editor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(382);
/* harmony import */ var _utils_alert_js__WEBPACK_IMPORTED_MODULE_3__ = /*#__PURE__*/__webpack_require__(13);
/* harmony import */ var _utils_request_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(542);
/* harmony import */ var _utils_auth_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(149);











let coverUrl = ''
let articleId = null // 全局保存文章ID

// 1. 加载文章频道
async function setChannelList() {
    const res = await (0,axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)({ url: '/v1_0/channels' })
    const htmlStr = `<option value="" selected>请选择文章频道</option>` + res.data.channels.map(item => {
        return `<option value="${item.id}">${item.name}</option>`
    }).join('')
    document.querySelector('.channel-select').innerHTML = htmlStr
}

// 2. 数据回显（核心新增逻辑）
async function loadArticleData() {
    const urlParams = new URLSearchParams(location.search)
    articleId = urlParams.get('id')
    if (!articleId) {
        (0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_3__/* .myAlert */ .x)(false, '未找到文章ID')
        return
    }

    try {
        // 先加载频道列表
        await setChannelList()

        const res = await (0,axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)({ url: `/v1_0/mp/articles/${articleId}` })
        const data = res.data

        // 回显标题
        document.querySelector('[name="title"]').value = data.title
        // 回显频道
        document.querySelector('[name="channel_id"]').value = data.channel_id
        // 回显富文本
        _utils_editor_js__WEBPACK_IMPORTED_MODULE_2__/* .editor */ .E.setHtml(data.content || '')

        // 回显封面
        if (data.cover && data.cover.images && data.cover.images.length > 0) {
            coverUrl = data.cover.images[0]
            const coverPage = document.querySelector('.coverPage')
            coverPage.src = coverUrl
            coverPage.classList.remove('hide')
            coverPage.classList.add('show')
        }
    } catch (error) {
        console.dir(error)
        ;(0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_3__/* .myAlert */ .x)(false, '获取文章详情失败')
    }
}

// 3. 图片上传逻辑（复用之前的，只需统一类名）
function uploadImg() {
    const coverPage = document.querySelector('.coverPage')
    const imgFile = document.querySelector('.img-file')

    // 点击图片触发文件选择
    coverPage.addEventListener('click', () => imgFile.click())
    // 点击加号也触发
    document.querySelector('.tenCross').addEventListener('click', (e) => {
        if (e.target !== coverPage) imgFile.click()
    })

    imgFile.addEventListener('change', async function (e) {
        const file = e.target.files[0]
        if (!file) return

        if (!/^image\//.test(file.type)) return alert('请选择图片文件')
        if (file.size / 1024 / 1024 > 2) return alert('图片不能超过 2MB')

        const fd = new FormData()
        fd.append('image', file)
        try {
            const responseImg = await (0,axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)({
                url: '/v1_0/upload',
                method: 'POST',
                data: fd
            })
            const url = responseImg?.data?.url || responseImg?.url
            if (!url) throw new Error('接口未返回图片地址')

            coverUrl = url
            coverPage.src = url
            coverPage.classList.remove('hide')
            coverPage.classList.add('show')
        } catch (err) {
            alert('上传失败，请重试')
        } finally {
            e.target.value = ''
        }
    })
}

// 4. 提交修改逻辑
function submitEdit() {
    const form = document.querySelector('.publish-form')
    form.addEventListener('submit', async function (e) {
        e.preventDefault()

        const formData = form_serialize__WEBPACK_IMPORTED_MODULE_1__(form, { hash: true, empty: true })
        formData.content = _utils_editor_js__WEBPACK_IMPORTED_MODULE_2__/* .editor */ .E.getHtml() // 同步富文本内容

        // 校验
        if (!formData.title.trim()) return (0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_3__/* .myAlert */ .x)(false, '请输入标题')
        if (!formData.channel_id) return (0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_3__/* .myAlert */ .x)(false, '请选择频道')
        if (formData.content === '<p><br></p>') return (0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_3__/* .myAlert */ .x)(false, '请输入文章内容')

        formData.channel_id = Number(formData.channel_id)

        // 封面处理
        if (coverUrl && !coverUrl.includes('.html')) {
            formData.cover = { type: 1, images: [coverUrl] }
        } else {
            formData.cover = { type: 0, images: [] }
        }

        const btn = document.querySelector('.submit-btn')
        btn.disabled = true

        try {
            // 🔥 核心修复：使用 PUT 请求，并携带正确的 URL
            await (0,axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)({
                url: `/v1_0/mp/articles/${articleId}`,
                method: 'PUT',
                data: formData
            })
            ;(0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_3__/* .myAlert */ .x)(true, '修改成功')
            setTimeout(() => { location.href = './content.html' }, 1500)
        } catch (error) {
            ;(0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_3__/* .myAlert */ .x)(false, error.response?.data?.message || '修改失败')
        } finally {
            btn.disabled = false
        }
    })
}

// 初始化执行
loadArticleData().then(() => {
    uploadImg()
    submitEdit()
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
/******/ __webpack_require__.j = 739;
/******/ 
/******/ /* webpack/runtime/jsonp chunk loading */
/******/ (() => {
/******/ 	// no baseURI
/******/ 	
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 	const installedChunks = {
/******/ 		739: 0
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
/******/ let __webpack_exports__ = __webpack_require__.O(undefined, [96,76], () => (__webpack_require__(768)))
/******/ __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 
