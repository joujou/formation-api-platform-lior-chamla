import axios from 'axios'

export function findAll() {
  return axios
    .get('http://localhost:8000/api/customers')
    .then((response) => response.data['hydra:member'])
}

export function deleteCustomer(id) {
  return axios.delete(`http://localhost:8000/api/customers/${id}`)
}
