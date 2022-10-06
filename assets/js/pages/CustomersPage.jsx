import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../components/Pagination'
const CustomersPage = () => {
  const [customers, setCustomers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/customers')
      .then((response) => response.data['hydra:member'])
      .then((data) => setCustomers(data))
      .catch((error) => console.log(error.response))
  }, [])

  const handleDelete = (id) => {
    // Copie des customers pour faire un mix optimiste/pessimiste
    const originalCustomers = [...customers]

    // Optimiste
    setCustomers(customers.filter((customer) => customer.id !== id))

    // Pessimiste = supprimer uniquement quand reponse requete delete

    axios
      .delete(`http://localhost:8000/api/customers/${id}`)
      .then((response) => console.log(response))
      .catch((error) => {
        setCustomers(originalCustomers)
        console.log(error.response)
      })
  }

  const itemsPerPage = 10

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const start = currentPage * itemsPerPage - itemsPerPage
  const paginatedCustomers = customers.slice(start, start + itemsPerPage)

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
          {paginatedCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                {customer.firstName} {customer.lastName}
              </td>
              <td>{customer.email}</td>
              <td>{customer.company}</td>
              <td>{customer.invoices.length}</td>
              <td>{customer.totalAmount.toLocaleString()} €</td>
              <td>
                <button
                  onClick={() => handleDelete(customer.id)}
                  disabled={customer.invoices.length > 0}
                  className="btn btn-sm btn-danger"
                >
                  Supprimer
                </button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        length={customers.length}
        onPageChanged={handlePageChange}
      />
    </>
  )
}
export default CustomersPage
