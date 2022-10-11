import React from 'react'
import { logout } from '../services/AuthAPI'
import { NavLink } from 'react-router-dom'

const Navbar = ({ isAuthenticated, onLogout }) => {
  const handleLogout = () => {
    logout()
    onLogout(false)
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link active" to="/">
                SymReact
                <span className="visually-hidden">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers">
                Clients
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/invoices">
                Factures
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            {(!isAuthenticated && (
              <>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Inscription
                  </a>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="btn btn-success">
                    Connexion
                  </NavLink>
                </li>
              </>
            )) || (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  href="#"
                  className="btn btn-danger"
                >
                  Déconnexion
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
