import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import { findAll, deleteInvoice } from '../services/InvoicesAPI'
import moment from 'moment'

const STATUS_CLASSES = {
  PAID: 'success',
  SENT: 'info',
  CANCEL: 'danger',
}

const STATUS_LABELS = {
  PAID: 'Payée',
  SENT: 'Envoyée',
  CANCEL: 'Annulée',
}

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

  const formatDate = (str) => moment(str).format('DD/MM/YYYY')

  const handleDelete = async (id) => {
    // Copie des invoices pour faire un mix optimiste/pessimiste
    const originalInvoices = [...invoices]

    // Optimiste
    setInvoices(invoices.filter((record) => record.id !== id))

    // Pessimiste = supprimer uniquement quand reponse requete delete
    try {
      await deleteInvoice(id)
    } catch (error) {
      setInvoices(originalInvoices)
    }
  }

  const itemsPerPage = 20

  const filteredInvoices = invoices.filter(
    (record) =>
      record.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      record.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      record.amount.toString().startsWith(search.toLowerCase()) ||
      STATUS_LABELS[record.status].toLowerCase().includes(search.toLowerCase())
  )

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
              <td>{formatDate(record.sentAt)}</td>
              <td>
                <span className={`badge bg-${STATUS_CLASSES[record.status]}`}>
                  {STATUS_LABELS[record.status]}
                </span>
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
