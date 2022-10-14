import axios from 'axios'

export function findAll() {
  return axios
    .get('http://localhost:8000/api/customers')
    .then((response) => response.data['hydra:member'])
}

export function deleteCustomer(id) {
  return axios.delete(`http://localhost:8000/api/customers/${id}`)
}

export function findCustomer(id) {
  return axios
    .get(`http://localhost:8000/api/customers/${id}`)
    .then((response) => response.data)
}

export function updateCustomer(id, object) {
  return axios.put(`http://localhost:8000/api/customers/${id}`, object)
}

export function createCustomer(object) {
  return axios.post('http://localhost:8000/api/customers', object)
}
