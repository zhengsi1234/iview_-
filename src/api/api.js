import axios from 'axios'
import store from '@/store/index'
import router from '@/router/index'
import { Message } from 'iview'

let base = process.env.API_URL;
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(config => {
    //设置请求头携带token
    if (store.state.user.token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`;
    }
    return config;
}, err => {
    Message.error("请求超时!");
    return Promise.resolve(err);
})
axios.interceptors.response.use(data => {
    if (data.status && data.status == 200 && data.data.status == 'error') {
        Message.error(data.data.msg);
        return;
    }
    return data;
}, err => {
    // if (err.response) {
    //     switch (err.response.status) {
    //         case 403:
    //             // 403 清除token信息并跳转到登录页面
    //             window.localStorage.clear();
    //             store.commit(types.LOGOUT);
    //             router.replace({
    //                 path: '/login',
    //                 // query: { redirect: router.currentRoute.fullPath }
    //             })
    //     }
    // }
    return Promise.reject(err.response.data);
})

//向后台请求数据
//get请求
export const getRequest = (url) => {
    if (store.state.user.token) {
        return axios({
            method: 'get',
            url: `${base}${url}`,
            headers: {
                'Authorization': `Bearer ${store.state.user.token}`
            }
        });
    } else {
        return axios({
            method: 'get',
            url: `${base}${url}`
        });
    }
}

//post请求
export const postRequest = (url, params) => {
    if (store.state.token) {
      return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${store.state.user.token}`
        }
      });
    } else {
      return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
//文件上传
export const uploadFileRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
//put请求
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.state.user.token}`
        }
    });
}
//delete请求
export const deleteRequest = (url) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.state.user.token}`
        }
    });
}