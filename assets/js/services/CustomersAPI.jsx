import axios from 'axios'
import * as Cache from '../services/Cache'

async function findAll() {
  const cachedCustomers = await Cache.get('customers')
  if (cachedCustomers) {
    console.log('ICICICII')
    return cachedCustomers
  }
  return axios.get('http://localhost:8000/api/customers').then((response) => {
    const customers = response.data['hydra:member']
    Cache.set('customers', customers)
    return customers
  })
}

function remove(id) {
  return axios
    .delete(`http://localhost:8000/api/customers/${id}`)
    .then(async (response) => {
      const cachedCustomers = await Cache.get('customers')
      if (cachedCustomers) {
        Cache.set(
          'customers',
          cachedCustomers.filter((c) => c.id !== id)
        )
      }
      return response
    })
}

async function find(id) {
  const cachedCustomer = await Cache.get('customers.' + id)
  if (cachedCustomer) return cachedCustomer
  return axios
    .get(`http://localhost:8000/api/customers/${id}`)
    .then((response) => {
      Cache.set('customers.' + id, response.data)
      return response.data
    })
}

function update(id, object) {
  return axios
    .put(`http://localhost:8000/api/customers/${id}`, object)
    .then(async (response) => {
      const cachedCustomers = await Cache.get('customers')
      const cachedCustomer = await Cache.get('customers.' + id)

      if (cachedCustomer) {
        Cache.set('customers.' + id, response.data)
      }

      if (cachedCustomers) {
        const index = cachedCustomers.findIndex((c) => c.id === +id)
        cachedCustomers[index] = response.data
        // Cache.set('customers', cachedCustomers)
      }
      return response
    })
}

function create(object) {
  return axios
    .post('http://localhost:8000/api/customers', object)
    .then(async (response) => {
      const cachedCustomers = await Cache.get('customers')
      if (cachedCustomers) {
        Cache.set('customers', [...cachedCustomers, response.data])
      }
      return response
    })
}

export { find, findAll, create, update, remove }
