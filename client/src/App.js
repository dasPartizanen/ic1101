import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRouters } from './routers'
import { useAuth } from './hooks/auth.hook';

import { AuthContext } from './context/AuthContext';

import { Navigation } from './components/Navigation/Navigation';
import { Loader } from './components/Loader/Loader';

import classNames from 'classnames';

import './app.scss'

function App() {
    const { login, logout, token, userId, name, ready } = useAuth()
    const isAuthenticated = !!token
    const routers = useRouters(isAuthenticated)

    const classSet = classNames(
        'app',
        isAuthenticated && 'app__navPlace'
    )

    if (!ready) {
        return <Loader mixClass='app_loader'/>
    }

    return (
        <AuthContext.Provider value={{
            token,
            userId,
            name,
            login,
            logout,
            isAuthenticated
        }}>
            <div className={classSet}>
                <BrowserRouter>
                    {isAuthenticated && <Navigation />}
                    {routers}
                </BrowserRouter>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
