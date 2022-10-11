/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './js/components/Navbar'
import HomePage from './js/pages/HomePage'
import { HashRouter, Route, Routes } from 'react-router-dom'
import CustomersPage from './js/pages/CustomersPage'
import InvoicesPage from './js/pages/InvoicesPage'
import CustomersPageWithPagination from './js/pages/CustomersPageWithPagination'
import LoginPage from './js/pages/LoginPage'

const App = () => {
  return (
    <>
      <HashRouter>
        <Navbar />
        <main className="container pt-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </HashRouter>
    </>
  )
}

const container = document.getElementById('app')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(<App />)
