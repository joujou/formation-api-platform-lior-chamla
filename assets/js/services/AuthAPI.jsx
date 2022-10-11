import axios from 'axios'
import jwtDecode from 'jwt-decode'

export function authenticate(credentials) {
  return axios
    .post(`http://localhost:8000/api/login_check`, credentials)
    .then((response) => response.data.token)
    .then((token) => {
      window.localStorage.setItem('authToken', token)
      setAxiosToken(token)
      return true
    })
}

export function logout() {
  window.localStorage.removeItem('authToken')
  delete axios.defaults.headers['Authorization']
}

function setAxiosToken(token) {
  console.log('ICI')
  axios.defaults.headers['Authorization'] = 'Bearer ' + token
}

export function setup() {
  const token = window.localStorage.getItem('authToken')
  if (token) {
    const { exp: expiration } = jwtDecode(token)
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token)
      console.log('Connexion OK avec axios')
    }
  } else {
    console.log('No token')
  }
}

export function isAuthenticated() {
  const token = window.localStorage.getItem('authToken')
  if (token) {
    const { exp: expiration } = jwtDecode(token)
    if (expiration * 1000 > new Date().getTime()) {
      return true
    }
  }
  return false
}