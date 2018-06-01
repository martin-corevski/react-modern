import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.DB_URL
})

// instance.defaults.headers.common['Authorization'] = 'INSTANCE AUTH TOKEN'
instance.defaults.headers.post['Content-Type'] = 'application/json'

// https://github.com/axios/axios#interceptors
axios.interceptors.request.use(
  request => {
    console.log('axios INSTANCE interceptors request: ', request)
    // Edit request config
    return request
  },
  error => {
    // request error handling, like loss of internet connection, server problems..
    console.log('axios INSTANCE interceptors request error: ', error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    console.log('axios INSTANCE interceptors response: ', response)
    // Edit response config
    return response
  },
  error => {
    // response error handling, like loss of internet connection, server problems..
    console.log('axios INSTANCE interceptors response error: ', error)
    return Promise.reject(error)
  }
)

export default instance
