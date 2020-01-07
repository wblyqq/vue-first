import axios from 'axios'
// 创建instance
// eslint-disable-next-line no-unused-vars
var instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
})

// 全局axios默认
axios.defaults.baseURL = 'https://api.example.com'
// eslint-disable-next-line no-undef
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(function (config) {
  /*

   */
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
