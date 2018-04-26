import axios from 'axios'
import {catchError} from './error_handler'

// // http request 拦截器
// axios.interceptors.request.use(
//   config => {
//       if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//           config.headers.Authorization = `token ${store.state.token}`;
//       }
//       return config;
//   },
//   err => {
//       return Promise.reject(err);
//   });

// // http response 拦截器
// axios.interceptors.response.use(
//   response => {
//       return response;
//   },
//   error => {
//       if (error.response) {
//           switch (error.response.status) {
//               case 401:
//                   // 返回 401 清除token信息并跳转到登录页面
//                   store.commit(types.LOGOUT);
//                   router.replace({
//                       path: 'login',
//                       query: {redirect: router.currentRoute.fullPath}
//                   })
//           }
//       }
//       return Promise.reject(error.response.data)   // 返回接口返回的错误信息
//   });

export function get(url, params, success, error, complete) {
  axios.get(url, {params: params}).then((response) => {
    if(success){
      success(response.data, response)
    }
  }, (err) => {
    catchError(err, error)
  }).then(() => {
    if(complete){
      complete()
    }
  })
}

/*
 * params是一个对象，包含fields, filter, sort, limit 等属性。
 * fields属性是一个数组，表示要获取的字段列表。
 * filter属性是一个对象，表示过滤条件。例如{name: 'michael'}表示筛选出name等于'michael'的记录，即等同于SQL中的where name = 'michael',
 * 其它特殊用法还有：{inc_name: michael, bob, jake} {exc_name: michael, bob, jake} {btw_age: 10, 20 }。
 * sort属性是一个数组，表示要排序的字段，字段名称前面加'-'表示倒序。
 * limit属性限制返回结果集的长度
 */
export function getList(url, params={}, success, error, complete) {
  var _params = {}
  if('fields' in params){
    _params['fields'] = params['fields'].join(',')
  }
  if('filter' in params){
    for(var key in params['filter'])
      _params[key] = params['filter'][key]
  }
  if('sort' in params){
    _params['sort'] = params['sort'].join(',')
  }
  if('limit' in params){
    _params['per_page'] = params['limit']
  }
  if('per_page' in params){
    _params['per_page'] = params['per_page']
  }
  if('page' in params) {
    _params['page'] = params['page']
  }
  get(url, _params, success, error, complete)
}

export function post(url, data, success, failed, error, complete) {
  axios.post(url, data).then((response) => {
    console.log('responseData:', response.data);
    if(success && response.data.state_code === 200){
      console.log('get real data, api: ', url);
      success(response.data.data);
    } else {
      if (response.data.state_code === 60020) {
        this.$dispatch('logout');
      }
      failed(response.data.info);
    }
  }, (err) => {
    catchError(err, error)
  }).then(() => {
    if(complete){
      complete()
    }
  })
}
export function put(url, data, success, error, complete) {
  axios.put(url, data).then((response) => {
    if(success){
      success(response.data)
    }
  }, (err) => {
    catchError(err, error)
  }).then(() => {
    if(complete){
      complete()
    }
  })
}

export function getAuth(success, error, complete) {
  return get('/api/Rest/Handle/auth_info', {}, success, error, complete)
}

// 修改密码
export function changePassword(old, new_, success, error, complete) {
  post('/api/Rest/Handle/change_password', {
    password_old: old,
    password_new: new_
  }, success, error, complete)
}
// 找回密码
export function findPassword(info, success, error, complete) {
  post('/api/Rest/Handle/find_password', info, success, error, complete)
}
export function exportExcel(url, filename, fields, filter_params, sort ) {
  let query_params = {}
  $.extend(query_params, filter_params)
  query_params['fields'] = fields.map(item => {return item[0]}).join(',')
  query_params['exports_excel_column'] = fields.map(item => {return item[1]}).join(',')
  query_params['sort'] = sort
  query_params['exports_excel_name'] = filename

  let anchor = $('<a></a>')
  anchor.attr('target', '_blank')
  let params = []
  for(let k in query_params){
    if(query_params.hasOwnProperty(k)){
      params.push(encodeURIComponent(k) + '=' + encodeURIComponent(query_params[k]))
    }
  }
  params = params.join('&')
  anchor.attr('href', url + '?' + params)
  anchor[0].click()
}

export function sendVerificationCode(phone_number, type, imgcode, success, error, complete) {
  post('/api/Rest/VerificationCode/send_tmp', {
    phone_number,
    type,
    imgcode,
  }, success, error, complete)
}

export function getQiniuUploadToken(api, success, error, complete) {
  if(!api){
    api = '/api/Rest/Handle/upload_token'
  }
  get(api, {}, (data) => {
    if(success){
      if(data){
        success(data.uptoken)
      } else {
        success('')
      }
    }
  }, error, complete)
}

export function uploadFile(data, onUploadProgress, success, error, complete){
  axios.post('http://upload.qiniu.com/', data, {
    onUploadProgress: onUploadProgress,
  }).then((response) => {
    if(success){
      success(response.data)
    }
  }, (err) => {
    catchError(err, error)
  }).then(() => {
    if(complete){
      complete()
    }
  })
}
let LocalStore = function () {
  this._store = window.localStorage
}

LocalStore.prototype.setItem = function (key, value, expire) {
  if(expire === undefined){
    expire = 10 * 60 * 1000
  }
  expire = new Date().getTime() + expire
  let data = {
    value,
    expire
  }
  data = JSON.stringify(data)
  this._store.setItem(key, data)
}

LocalStore.prototype.getItem = function (key) {
  let val = JSON.parse(this._store.getItem(key))
  let now = new Date().getTime()
  if(val && val.expire >= now){
    return val.value
  }
  return null
}

export let localStore = new LocalStore()

export default {
  getAuth,
  get,
  getList,
  post,
  put,
  findPassword,
  changePassword,
  exportExcel,
  sendVerificationCode,
  getQiniuUploadToken,
  uploadFile,
  localStore,
}