import React, { useEffect, useState } from 'react'
import Field from '../components/Forms/Field'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  createCustomer,
  findCustomer,
  updateCustomer,
} from '../services/CustomersAPI'
import Select from '../components/Select'

const InvoicePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [editing, setEditing] = useState(false)

  const fetchCustomer = async (id) => {
    try {
      const { firstName, lastName, email, company } = await findCustomer(id)

      setCustomer({ lastName, firstName, email, company })
    } catch (e) {
      console.log(e.response)
      navigate('/invoices')
    }
  }

  useEffect(() => {
    if (id !== 'new') {
      setEditing(true)
      fetchCustomer(id)
    } else {
      setEditing(false)
    }
  }, [id])

  const [invoice, setInvoice] = useState({
    amount: '',
    customer: '',
    status: '',
  })

  const [errors, setErrors] = useState({
    amount: '',
    customer: '',
    status: '',
  })

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setInvoice({ ...invoice, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      if (editing) {
        await updateCustomer(id, customer)
      } else {
        const response = await createCustomer(customer)
        navigate('/customers')
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
        </form>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-success">
          Enregistrer
        </button>
        <Link to="/invoices" className="btn btn-link">
          Retour à la liste
        </Link>
      </div>
    </>
  )
}
export default InvoicePage
