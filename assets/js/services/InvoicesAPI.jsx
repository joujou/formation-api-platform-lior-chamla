import axios from 'axios'
import { INVOICES_API } from '../config'

function findAll() {
  return axios
    .get(INVOICES_API)
    .then((response) => response.data['hydra:member'])
}

function remove(id) {
  return axios.delete(INVOICES_API + `/${id}`)
}

function update(id, object) {
  return axios.put(INVOICES_API + `/${id}`, object)
}

function create(object) {
  return axios.post(INVOICES_API, object)
}

function find(id) {
  return axios.get(INVOICES_API + `/${id}`).then((response) => response.data)
}

export { find, findAll, create, remove, update }
