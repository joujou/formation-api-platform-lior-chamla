import React, { useState } from 'react'
import { authenticate } from '../services/AuthAPI'

const LoginPage = () => {
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
      setError('')
    } catch (e) {
      console.log(e)
      setError('Echec connexion')
    }
  }

  return (
    <>
      <h1>Connexion</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Adresse email</label>
          <input
            type="email"
            placeholder="Email de connexion"
            className={'form-control' + (error && ' is-invalid')}
            id="username"
            value={credentials.username}
            onChange={handleChange}
            name="username"
          />
          {error && <p className="invalid-feedback">{error}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Mot de passe"
            id="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
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
