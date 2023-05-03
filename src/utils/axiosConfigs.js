import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_SERVER
})

// api.interceptors.response.use(
//   (response) => {
//     const {
//       accessToken,
//       refreshToken
//     } = response.data
//     if (accessToken) {
//       localStorage.setItem('accessToken', JSON.stringify(accessToken))
//     }
//     if (refreshToken) {
//       localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
//     }
//     return response
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.clear()
//       window.location.href = '/'
//     }
//     return Promise.reject(error)
//   }
// )

export default api
