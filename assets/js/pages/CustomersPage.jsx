import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import * as CustomersAPI from '../services/CustomersAPI'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const CustomersPage = () => {
  const [customers, setCustomers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const fetchCustomer = async () => {
    try {
      const data = await CustomersAPI.findAll()
      setCustomers(data)
    } catch (error) {
      toast.error('Erreur lors du chargement des clients')
    }
  }
  useEffect(() => {
    fetchCustomer()
  }, [])

  const handleDelete = async (id) => {
    // Copie des customers pour faire un mix optimiste/pessimiste
    const originalCustomers = [...customers]

    // Optimiste
    setCustomers(customers.filter((customer) => customer.id !== id))

    // Pessimiste = supprimer uniquement quand reponse requete delete
    try {
      await CustomersAPI.remove(id)
      toast.success('Suppression OK')
    } catch (error) {
      setCustomers(originalCustomers)
      toast.error('Erreur lors de la suppression')
    }
  }

  const itemsPerPage = 10

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      (customer.company &&
        customer.company.toLowerCase().includes(search.toLowerCase()))
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const paginatedCustomers = Pagination.getData(
    filteredCustomers,
    currentPage,
    itemsPerPage
  )

  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value)
    setCurrentPage(1)
  }

  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>Clients</h1>
        <Link className="btn btn-primary" to="/customer/new">
          Créer un client
        </Link>
      </div>
      <div className="form-group">
        <input
          className="form-control"
          onChange={handleSearch}
          placeholder="Rechecher"
          value={search}
        />
      </div>
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
                <Link
                  to={`/customer/${customer.id}`}
                  className="btn btn-sm btn-primary mr-1"
                >
                  Editer
                </Link>
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
      {itemsPerPage < filteredCustomers.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredCustomers.length}
          onPageChanged={handlePageChange}
        />
      )}
    </>
  )
}
export default CustomersPage
