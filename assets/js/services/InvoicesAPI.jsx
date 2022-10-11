import axios from 'axios'

export function findAll() {
  return axios
    .get('http://localhost:8000/api/invoices')
    .then((response) => response.data['hydra:member'])
}

export function deleteInvoice(id) {
  return axios.delete(`http://localhost:8000/api/invoices/${id}`)
}
