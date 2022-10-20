/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css'
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './js/components/Navbar'
import HomePage from './js/pages/HomePage'
import { HashRouter, Route, Routes } from 'react-router-dom'
import CustomersPage from './js/pages/CustomersPage'
import InvoicesPage from './js/pages/InvoicesPage'
import LoginPage from './js/pages/LoginPage'
import { setup, getIsAuthenticated } from './js/services/AuthAPI'
import RequireAuth from './js/services/RequireAuth'
import { AuthContext } from './js/contexts/AuthContext'
import CustomerPage from './js/pages/CustomerPage'
import InvoicePage from './js/pages/InvoicePage'
import RegisterPage from './js/pages/RegisterPage'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

setup()

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(getIsAuthenticated)

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuthenticated: isAuthenticated,
          setIsAuthenticated: setIsAuthenticated,
        }}
      >
        <HashRouter>
          <Navbar />
          <main className="container pt-5">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/customers"
                element={
                  <RequireAuth>
                    <CustomersPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/customer/:id"
                element={
                  <RequireAuth>
                    <CustomerPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/invoices"
                element={
                  <RequireAuth>
                    <InvoicesPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/invoice/:id"
                element={
                  <RequireAuth>
                    <InvoicePage />
                  </RequireAuth>
                }
              />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
        </HashRouter>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT}></ToastContainer>
      </AuthContext.Provider>
    </>
  )
}

const container = document.getElementById('app')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(<App />)
