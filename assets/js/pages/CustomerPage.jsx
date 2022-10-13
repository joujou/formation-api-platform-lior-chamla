import React, { useState } from 'react'
import Field from '../components/Forms/Field'
import { Link } from 'react-router-dom'
const CustomerPage = () => {
  const [customer, setCustomer] = useState({
    lastName: 'Chamla',
    firstName: '',
    email: '',
    company: '',
  })

  const [errors, setErrors] = useState()

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setCustomer({ ...customer, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(customer)
  }

  return (
    <>
      <h1>Création d'un client</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name="lastName"
          label="Nom de famille"
          placeholder="Nom de famille du client"
          onChange={handleChange}
        />
        <Field
          name="firstName"
          label="Prénom"
          placeholder="Prénom du client"
          value={customer.firstName}
          onChange={handleChange}
        />
        <Field
          name="email"
          label="E-Mail"
          placeholder="Email du client"
          value={customer.email}
          onChange={handleChange}
        />
        <Field
          name="company"
          label="Entreprise"
          placeholder="Entreprise du client"
          value={customer.company}
          onChange={handleChange}
        />
        <div className="form-group">
          <button className="btn btn-success">Enregistrer</button>
          <Link to="/customers" className="btn btn-link">
            Retour à la liste
          </Link>
        </div>
      </form>
    </>
  )
}
export default CustomerPage
