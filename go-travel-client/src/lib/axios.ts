import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    if (config.headers?.['X-Skip-Auth']) {
      delete config.headers['X-Skip-Auth']
      return config
    }

    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
