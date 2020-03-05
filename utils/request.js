import axios from "axios";
import { Message, MessageBox } from 'element-ui'
import Cookies from 'js-cookie'

const service = axios.create({
  baseURL: 'http://localhost:7001',
  timeout: 10000
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (Cookies.get('piao_token')) {
      config.headers['piao_token'] = Cookies.get('piao_token');
    }
    // console.log(Cookies.get('piao_token'));
    // console.log('123');
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    // console.log(response);
    if (response.headers['piao_token']) {
      Cookies.set('piao_token', response.headers['piao_token']);
    }
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error); // for debug
    if(error.response.status === 401) {
      return "unAuth";
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });

    return Promise.reject(error)
  }
);

export default service;
