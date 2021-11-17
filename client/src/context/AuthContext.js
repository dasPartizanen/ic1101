import { createContext } from 'react'

function cl() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    name: '',
    login: cl,
    logout: cl,
    isAuthenticated: false
})
