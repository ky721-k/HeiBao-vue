import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// API方法
export const getGameList = () => {
  return request.get('/gamelist')
}

export const login = (data) => {
  return request.get('/login', { params: data })
}

export const register = (data) => {
  return request.get('/register', { params: data })
}

export const getUserInfo = () => {
  return request.get('/userinfo')
}