import axios from 'axios'

export function authenticate(credentials) {
  return axios
    .post(`http://localhost:8000/api/login_check`, credentials)
    .then((response) => response.data.token)
    .then((token) => {
      window.localStorage.setItem('authToken', token)
      axios.defaults.headers['Authorization'] = 'Bearer ' + token
      return true
    })
}

export function logout() {
  window.localStorage.removeItem('authToken')
  delete axios.defaults.headers['Authorization']
}
