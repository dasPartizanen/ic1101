import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [ready, setReady] = useState(false)
    const [name, setName] = useState(null)

    const login = useCallback( (jwtToken, id, userName) => {
        setToken(jwtToken)
        setUserId(id)
        setName(userName)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken,
            name: userName,
        }))
    }, [])

    const logout = useCallback( () => {
        setToken(null)
        setUserId(null)
        setName(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.id, data.name)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, name, ready }
}
