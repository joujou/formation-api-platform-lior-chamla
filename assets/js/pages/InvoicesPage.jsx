import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import { findAll, remove as deleteInvoice } from '../services/InvoicesAPI'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import TableLoader from '../components/Loaders/TableLoader'

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
  const [loading, setLoading] = useState(true)
  const fetchInvoice = async () => {
    try {
      const data = await findAll()
      setInvoices(data)
      setLoading(false)
    } catch (error) {
      toast.error('Erreur lors du chargement des factures')
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
      toast.success('Facture supprimée')
    } catch (error) {
      toast.error('Une erreur est survenue')
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
      <div className="d-flex justify-content-between align-items-center">
        <h1>Factures</h1>
        <Link className="btn btn-primary" to="/invoice/new">
          Créer une facture
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
            <th>N°</th>
            <th>Client</th>
            <th>Date envoi</th>
            <th>Status</th>
            <th>Montant</th>
            <th>Montant total</th>
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {paginatedInvoices.map((record) => (
              <tr key={record.id}>
                <td>{record.chrono}</td>
                <td>
                  <Link to={`/customer/${record.customer.id}`}>
                    {record.customer.firstName} {record.customer.lastName}
                  </Link>
                </td>
                <td>{formatDate(record.sentAt)}</td>
                <td>
                  <span className={`badge bg-${STATUS_CLASSES[record.status]}`}>
                    {STATUS_LABELS[record.status]}
                  </span>
                </td>
                <td>{record.amount.toLocaleString()}</td>
                <td>
                  <Link
                    to={`/invoice/${record.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editer
                  </Link>
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
        )}
      </table>
      {loading && <TableLoader></TableLoader>}
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
