import React, { createContext } from 'react'

// Créer le contexte
export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value) => {},
})
