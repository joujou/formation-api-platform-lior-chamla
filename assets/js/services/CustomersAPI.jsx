import axios from 'axios'

function findAll() {
  return axios
    .get('http://localhost:8000/api/customers')
    .then((response) => response.data['hydra:member'])
}

function remove(id) {
  return axios.delete(`http://localhost:8000/api/customers/${id}`)
}

function find(id) {
  return axios
    .get(`http://localhost:8000/api/customers/${id}`)
    .then((response) => response.data)
}

function update(id, object) {
  return axios.put(`http://localhost:8000/api/customers/${id}`, object)
}

function create(object) {
  return axios.post('http://localhost:8000/api/customers', object)
}

export { find, findAll, create, update, remove }
