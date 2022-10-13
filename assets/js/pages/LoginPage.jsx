import React, { useContext, useState } from 'react'
import { authenticate } from '../services/AuthAPI'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import Field from '../components/Forms/Field'

const LoginPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget
    setCredentials({
      ...credentials,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await authenticate(credentials)
      setIsAuthenticated(true)
      setError('')
      navigate('/customers')
    } catch (e) {
      console.log(e)
      setError('Echec connexion')
    }
  }

  return (
    <>
      <h1>Connexion</h1>
      <form>
        <Field
          name="username"
          label="Email"
          value={credentials.username}
          onChange={handleChange}
          error={error}
        ></Field>

        <Field
          name="password"
          label="Mot de passe"
          value={credentials.password}
          onChange={handleChange}
          type="password"
          error=""
        ></Field>

        <div className="form-group">
          <button
            type="submit"
            className="btn btn-success"
            onClick={handleSubmit}
          >
            Je me connecte
          </button>
        </div>
      </form>
    </>
  )
}
export default LoginPage
