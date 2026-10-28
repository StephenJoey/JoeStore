(self["webpackChunkwebpack"] = self["webpackChunkwebpack"] || []).push([[76],{

/***/ 13
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {


const myAlert = function myAlert(isSuccess, msg) {
    document.querySelector('.alert').classList.add(isSuccess ? 'alert-success' : 'alert-danger')
    document.querySelector('.alert').classList.add('show')
    document.querySelector('.alert').innerHTML = msg

    setTimeout(function () {
        document.querySelector('.alert').classList.remove(isSuccess ? 'alert-success' : 'alert-danger')
        document.querySelector('.alert').classList.remove('show')
    }, 3000)
}



/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "x", 0, /* binding */ myAlert
/* harmony export */ ]);


/***/ },

/***/ 149
(__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = /*#__PURE__*/__webpack_require__(324);
/* harmony import */ var _utils_request_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(542);



const token = localStorage.getItem('token')

if (!token) {
    // ⚠️ 注意：你的登录页是 login.html，别再写成 index.html 啦！
    location.href = './login.html';
} else {
    // 🔥 把请求放进 else 里，没登录就不发请求
    (0,axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)({
        url: '/v1_0/user/profile'
    }).then(
        result => {
            // console.log(result)
            // 防御性编程：防止页面里没有这两个元素时保错
            const phoneEl = document.querySelector('.main-content .phone');
            const imgEl = document.querySelector('.main-content .profileImg');
            if (phoneEl) phoneEl.innerHTML = result.data.name;
            if (imgEl) imgEl.src = result.data.photo;
        }
    )
}

/***/ },

/***/ 382
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _wangeditor_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(309);

 // 引入 V5 官方样式

// 1. 编辑器配置
const editorConfig = {
  placeholder: '请输入内容...',
  // V5 的菜单配置项全放在 MENU_CONF 里
  MENU_CONF: {
    uploadImage: {
      server: 'https://hmajax.itheima.net/api/uploadimg',
      fieldName: 'img',
      maxFileSize: 2 * 1024 * 1024,
      allowedFileTypes: ['image/*'],
      customInsert(res, insertFn) {
        console.log('图片上传响应:', res);
        // 根据黑马接口返回的数据结构，防御性取值
        if (res.data && res.data.url) {
          insertFn(res.data.url); // V5 的插入方法
        } else {
          alert(res.message || res.msg || '图片上传失败');
        }
      }
    }
  },
  // 监听内容改变，同步给隐藏的 textarea，以便 form-serialize 能拿到数据
  onChange(editor) {
    const html = editor.getHtml();
    const publishContent = document.querySelector('.publish-content');
    if (publishContent) {
      publishContent.value = html;
    }
  }
};

// 2. 创建编辑器实例
const editor = (0,_wangeditor_editor__WEBPACK_IMPORTED_MODULE_0__/* .createEditor */ .ie)({
  selector: '#editor-container',
  html: '<p><br></p>', // 默认初始内容
  config: editorConfig,
  mode: 'default', // 'default' 或 'simple'
});

// 3. 创建工具栏
const toolbar = (0,_wangeditor_editor__WEBPACK_IMPORTED_MODULE_0__/* .createToolbar */ .Qr)({
  editor,
  selector: '#toolbar-container',
  config: {},
  mode: 'default',
});

// 4. 导出 editor 实例，供 publish.js 调用（比如 editor.clear()）

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "E", 0, /* binding */ editor
/* harmony export */ ]);


/***/ },

/***/ 542
(__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = /*#__PURE__*/__webpack_require__(324);


// axios 公共配置
axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.defaults.baseURL = 'https://geek.itheima.net'

axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 统一携带 token 令牌字符串在请求头上
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = `Bearer ${token}`)

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const result = response.data
    return result;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么,例如：统一对401身份验证失败的情况做出处理
    console.dir(error)
    if (error?.response?.status === 401) {
        alert('用户的身份信息缺失,请重新登录')
        localStorage.clear()
        location.href = './login.html'
    }
    return Promise.reject(error);
});

/***/ }

}])