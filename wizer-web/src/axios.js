import axios from 'axios'


const axiosInstance = axios.create({
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token')
        ? `Bearer ${localStorage.getItem('access_token')}`// this is like saying 'Bearer 49582048902485kfjdkj'
        : null,                                        // so it's just the access token on the header 
        'Content-Type': 'application/json',            // if there is a token format it, else return null
        accept: 'application/json'
    },
})


// axios.interceptors.response.use(
//     (response) => {
//       return response
//     },
//     (error) => {
//       return new Promise((resolve) => {
//         const originalRequest = error.config
//         const refreshToken = localStorage.get('refresh_token')
//         if (error.response && error.response.status === 401 && error.config && !error.config.__isRetryRequest && refreshToken) {
//           originalRequest._retry = true
  
//           const response = fetch(api.refreshToken, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               refresh: refreshToken,
//             }),
//           })
//             .then((res) => res.json())
//             .then((res) => {
//               localStorage.set(res.access, 'token')
  
//               return axios(originalRequest)
//             })
//           resolve(response)
//         }
  
//         return Promise.reject(error)
//       })
//     },
//   )


export default axiosInstance