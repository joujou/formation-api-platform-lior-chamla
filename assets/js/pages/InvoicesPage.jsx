import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import { findAll, deleteInvoice } from '../services/InvoicesAPI'

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const fetchInvoice = async () => {
    try {
      const data = await findAll()
      setInvoices(data)
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    fetchInvoice()
  }, [])

  const handleDelete = async (id) => {
    // Copie des invoices pour faire un mix optimiste/pessimiste
    const originalInvoices = [...invoices]

    // Optimiste
    setInvoices(invoices.filter((record) => record.id !== id))

    // Pessimiste = supprimer uniquement quand reponse requete delete
    try {
      await deleteCustomer(id)
    } catch (error) {
      setInvoices(originalInvoices)
    }
  }

  const itemsPerPage = 10

  const filteredInvoices = invoices.filter((record) => true)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const paginatedInvoices = Pagination.getData(
    filteredInvoices,
    currentPage,
    itemsPerPage
  )

  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value)
    setCurrentPage(1)
  }

  return (
    <>
      <h1>Factures</h1>
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
            <th>N°</th>
            <th>Client</th>
            <th>Date envoi</th>
            <th>Status</th>
            <th>Montant</th>
            <th>Montant total</th>
          </tr>
        </thead>
        <tbody>
          {paginatedInvoices.map((record) => (
            <tr key={record.id}>
              <td>{record.chrono}</td>
              <td>
                {record.customer.firstName} {record.customer.lastName}
              </td>
              <td>{record.sentAt}</td>
              <td>
                <span className="badge bg-success">{record.status}</span>
              </td>
              <td>{record.amount.toLocaleString()}</td>
              <td>
                <button
                  onClick={() => handleDelete(record.id)}
                  className="btn btn-sm btn-danger"
                >
                  Supprimer
                </button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {itemsPerPage < filteredInvoices.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredInvoices.length}
          onPageChanged={handlePageChange}
        />
      )}
    </>
  )
}
export default InvoicesPage
