import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { logPlugin } from '@babel/preset-env/lib/debug'
const CustomersPage = () => {
  const [customers, setCustomers] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/customers')
      .then((response) => response.data['hydra:member'])
      .then((data) => setCustomers(data))
      .catch((error) => console.log(error.response))
  }, [])
  return (
    <>
      <h1>Clients</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id.</th>
            <th>Client</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th>Factures</th>
            <th>Montant total</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                {customer.firstName} {customer.lastName}
              </td>
              <td>{customer.email}</td>
              <td>{customer.company}</td>
              <td>{customer.invoices.length}</td>
              <td>{customer.totalAmount.toLocaleString()} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
export default CustomersPage
