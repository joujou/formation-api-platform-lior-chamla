import React, { useState } from 'react'
import Field from '../components/Forms/Field'
import { Link, useNavigate } from 'react-router-dom'
import * as UsersAPI from '../services/UsersAPI'
import { toast } from 'react-toastify'

const RegisterPage = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const navigate = useNavigate()

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const apiErrors = {}
    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm = 'Confirmation de mot de passe non conforme'
      toast.error('Erreurs dans le formulaire')
      setErrors(apiErrors)
      return
    }

    try {
      const response = await UsersAPI.register(user)
      toast.success('Vous êtes inscrit')
      navigate('/login')
      setErrors({})
    } catch ({ response }) {
      const { violations } = response.data
      if (violations) {
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message
        })
        setErrors(apiErrors)
      }
      toast.error('Erreurs dans le formulaire')
    }
  }

  return (
    <>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name="firstName"
          label="Prénom"
          placeholder="Prénom"
          error={errors.firstName}
          value={user.firstName}
          onChange={handleChange}
        ></Field>
        <Field
          name="lastName"
          label="Nom"
          placeholder="Nom"
          error={errors.lastName}
          value={user.lastName}
          onChange={handleChange}
        ></Field>
        <Field
          name="email"
          label="Email"
          placeholder="Email"
          error={errors.email}
          value={user.email}
          onChange={handleChange}
        ></Field>
        <Field
          name="password"
          type="password"
          label="Mot de passe"
          placeholder="Mot de passe"
          error={errors.password}
          value={user.password}
          onChange={handleChange}
        ></Field>
        <Field
          name="passwordConfirm"
          type="password"
          label="Confirmation de mot de passe"
          placeholder="Confirmation de mot de passe"
          error={errors.passwordConfirm}
          value={user.passwordConfirm}
          onChange={handleChange}
        ></Field>
        <div className="form-group">
          <button className="btn btn-success">Confirmation</button>
          <Link className="btn- btn-link" to="/login">
            J'ai déjà un compte
          </Link>
        </div>
      </form>
    </>
  )
}
export default RegisterPage
