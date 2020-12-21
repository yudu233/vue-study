import axios from 'axios' // 引入axios
import { Message } from 'element-ui';


axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
axios.defaults.timeout = 5000
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//拦截器
axios.interceptors.response.use(
  response => {
    const data = response.data
    console.log(data);
    if (data.meta.status === 200) {
      return data
    } else {
      errorHandle(data.meta.status, data.meta.msg);
      // Promise.reject(data)
    }
  },

  error => {
    Promise.reject('网络异常');
  }
)

const errorHandle = (status, msg) => {
  // Promise.reject(msg);
  Message.error(msg)
  throw msg
  // 状态码判断
  switch (status) {
    case 400: //请求的地址不存在或者包含不支持的参数
      break;
    case 401: //未授权
      break;
    case 403: //被禁止访问
      break;
    case 404: //请求的资源不存在
      break;
    case 422: //[POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误
      break;
    case 500: //内部错误
      break;
    default:
      console.log(msg);
  }
}
export default axios
