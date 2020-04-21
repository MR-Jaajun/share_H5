/*
 * @Description: 
 * @Author: Roc
 * @Date: 2019-10-31 10:16:19
 * @LastEditors: duo
 * @LastEditTime: 2019-11-14 17:53:52
 */
import axios from 'axios'
import qs from 'qs'
import store from 'store/index'
import { Indicator, Toast } from 'mint-ui'

axios.defaults.timeout = 12000 // 请求超时时间
console.log('环境：', process.env.NODE_ENV)
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? window.global_config.BASE : window.global_config.BASE_URL;
// axios.defaults.baseURL = ''
// axios.defaults.baseURL = 'https://apitest.xgscheng.com'
// axios.defaults.baseURL = process.env.VUE_APP_BASE_API

// post请求头的设置
axios.defaults.headers['appversion'] = 'v230'
axios.defaults.headers['deviceid'] = 'webshop'
axios.defaults.headers['devicetype'] = '3'
axios.defaults.headers['longitude'] = '113.464662'
axios.defaults.headers['latitude'] = '23.10911'
// axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'

// 获取参数
function getQueryString(name) {
  let search = window.location.href.split("?")
  console.log(search)
  let u = '?' + search[search.length-1]
  console.log(u)
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = u.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
localStorage.setItem('code', getQueryString("code"))
// console.log('code',getQueryString("code"))

// axios 请求拦截器
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token")
    // console.log('请求拦截器')
    // 可在此设置要发送的token
    // let token = store.getters['login/token'];
    token && (config.headers.token = token)
    // config.headers.timestamp = Date.parse(new Date()) / 1000;
    // config.headers.signature = 'asdasdasddabc'
    Indicator.open('数据加载中')
    return config
  },
  error => {
    return Promise.error(error)
  }
)
// instance 是你的 axios 实例
// instance.interceptors.request.use(config => ({
//     ...config,
//     data: {
//         // 此处注意，你的`data`应该是个对象，不能是其他数据类型
//         ...(config.data || {}),
//         _t: +new Date()
//     }
// }))
// axios respone拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误 结合自身业务和后台返回的接口状态约定写respone拦截器
    Indicator.close()
    if (response.status === 200 && response.data.code === 200) {
      return Promise.resolve(response)
    } else {
      Toast({
        message: response.data.msg||'请求失败',
        position: 'middle',
        duration: 2000
      });
      return Promise.reject(response)
    }
  },
  error => {
    Indicator.close()
    const responseCode = error.response.status
    switch (responseCode) {
      // 401：未登录
      case 401:
        break
      // 404请求不存在
      case 404:
        Toast({
          message: '网络请求不存在',
          position: 'middle',
          duration: 2000
        });
        break
      default:
        Toast({
          message: error.response.data.msg||'请求失败..',
          position: 'middle',
          duration: 2000
        });
    }
    return Promise.reject(error.response)
  }
)
/**
 * 封装get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
  // 或者return axios.get();
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      // .post(url, params)
      .post(url, qs.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
  //  或者return axios.post();
}

export { get, post, getQueryString }
