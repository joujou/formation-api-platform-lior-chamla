import React, { useEffect, useState } from 'react'
import Field from '../components/Forms/Field'
import { Link, useNavigate, useParams } from 'react-router-dom'

import * as InvoicesAPI from '../services/InvoicesAPI'
import * as CustomersAPI from '../services/CustomersAPI'
import Select from '../components/Select'
import { toast } from 'react-toastify'

const InvoicePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [editing, setEditing] = useState(false)

  const [customers, setCustomers] = useState([])

  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll()
      setCustomers(data)
      if (!invoice.customer) setInvoice({ ...invoice, customer: data[0].id })
    } catch (error) {
      toast.error('Erreur lors du chargement des clients')
    }
  }

  const fetchInvoice = async (id) => {
    try {
      const { amount, status, customer } = await InvoicesAPI.find(id)

      setInvoice({ amount, status, customer: customer.id })
    } catch (e) {
      toast.error('Erreur dans le chargement de la facture')
      navigate('/invoices')
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  useEffect(() => {
    if (id !== 'new') {
      fetchInvoice(id)
      setEditing(true)
    } else {
      setEditing(false)
    }
  }, [id])

  const [invoice, setInvoice] = useState({
    amount: '',
    customer: '',
    status: 'SENT',
  })

  const [errors, setErrors] = useState({
    amount: '',
    customer: '',
    status: '',
  })

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setInvoice({ ...invoice, [name]: value })
    console.log(invoice)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (editing) {
        const response = await InvoicesAPI.update(id, {
          ...invoice,
          customer: `/api/customers/${invoice.customer}`,
        })
        toast.success('Facture modifiée')
      } else {
        const response = await InvoicesAPI.create({
          ...invoice,
          customer: `/api/customers/${invoice.customer}`,
        })
        toast.success('Facture créée')
        navigate('/invoices')
      }

      //setErrors({})
    } catch ({ response }) {
      const { violations } = response.data
      if (violations) {
        const apiErrors = {}
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message
        })
        setErrors(apiErrors)
        toast.success('Des erreurs sont survenues')
      }
    }
  }

  return (
    <>
      {(!editing && <h1>Création d'une facture</h1>) || (
        <h1>Modification de la facture</h1>
      )}
      <div className="form-group row">
        <form onSubmit={handleSubmit}>
          <Field
            name="amount"
            type="number"
            label="Montant"
            placeholder="Montant"
            onChange={handleChange}
            error={errors.amount}
            value={invoice.amount}
          />
          <Select
            name="customer"
            label="Client"
            value={invoice.customer}
            error={errors.customer}
            onChange={handleChange}
          >
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.firstName} {customer.lastName}
              </option>
            ))}
          </Select>
          <Select
            name="status"
            label="status"
            value={invoice.status}
            error={errors.status}
            onChange={handleChange}
          >
            <option value="SENT">Envoyée</option>
            <option value="PAID">Payée</option>
            <option value="CANCELLED">Annulée</option>
          </Select>
          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
            <Link to="/invoices" className="btn btn-link">
              Retour à la liste
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}
export default InvoicePage
