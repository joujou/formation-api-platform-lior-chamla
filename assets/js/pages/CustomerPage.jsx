import React, { useEffect, useState } from 'react'
import Field from '../components/Forms/Field'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  create as createCustomer,
  find as findCustomer,
  update as updateCustomer,
} from '../services/CustomersAPI'
import { toast } from 'react-toastify'
import FormContentLoader from '../components/Loaders/FormContentLoader'

const CustomerPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)

  const fetchCustomer = async (id) => {
    try {
      const { firstName, lastName, email, company } = await findCustomer(id)
      setCustomer({ lastName, firstName, email, company })
      setLoading(false)
    } catch (e) {
      toast.error('Erreur lors du chargement du client')
      navigate('/customers')
    }
  }

  useEffect(() => {
    if (id !== 'new') {
      setLoading(true)
      setEditing(true)
      fetchCustomer(id)
    } else {
      setEditing(false)
    }
  }, [id])

  const [customer, setCustomer] = useState({
    lastName: '',
    firstName: '',
    email: '',
    company: '',
  })

  const [errors, setErrors] = useState({
    lastName: '',
    firstName: '',
    email: '',
    company: '',
  })

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setCustomer({ ...customer, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setErrors({})
      if (editing) {
        await updateCustomer(id, customer)
        toast.success('Update du client OK')
      } else {
        const response = await createCustomer(customer)
        toast.success('Client créé')
      }
      navigate('/customers')

      //setErrors({})
    } catch ({ response }) {
      const { violations } = response.data
      if (violations) {
        const apiErrors = {}
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message
        })
        setErrors(apiErrors)
        toast.error('Erreurs')
      }
    }
  }

  return (
    <>
      {(!editing && <h1>Création d'un client</h1>) || (
        <h1>Modification du client</h1>
      )}
      {loading && <FormContentLoader></FormContentLoader>}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <Field
            name="lastName"
            label="Nom de famille"
            placeholder="Nom de famille du client"
            onChange={handleChange}
            error={errors.lastName}
            value={customer.lastName}
          />
          <Field
            name="firstName"
            label="Prénom"
            placeholder="Prénom du client"
            value={customer.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <Field
            name="email"
            label="E-Mail"
            placeholder="Email du client"
            value={customer.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Field
            name="company"
            label="Entreprise"
            placeholder="Entreprise du client"
            value={customer.company}
            onChange={handleChange}
            error={errors.company}
          />
          <div className="form-group">
            <button className="btn btn-success">Enregistrer</button>
            <Link to="/customers" className="btn btn-link">
              Retour à la liste
            </Link>
          </div>
        </form>
      )}
    </>
  )
}
export default CustomerPage
