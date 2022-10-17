import axios from 'axios'

function findAll() {
  return axios
    .get('http://localhost:8000/api/invoices')
    .then((response) => response.data['hydra:member'])
}

function remove(id) {
  return axios.delete(`http://localhost:8000/api/invoices/${id}`)
}

function update(id, object) {
  return axios.put(`http://localhost:8000/api/invoices/${id}`, object)
}

function create(object) {
  return axios.post('http://localhost:8000/api/invoices', object)
}

function find(id) {
  return axios
    .get(`http://localhost:8000/api/invoices/${id}`)
    .then((response) => response.data)
}

export { find, findAll, create, remove, update }
