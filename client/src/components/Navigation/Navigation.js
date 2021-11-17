import React, {useContext} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import './navigation.scss'

export const Navigation = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const handlerLogout = (e) => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav className='navigation'>
            <NavLink
                className='navigation_link'
                to='/home'
            >
                Заметки
            </NavLink>
            <NavLink
                className='navigation_link'
                to='/add'
            >
                Добавить
            </NavLink>
            <a
                className='navigation_link'
                href='/'
                onClick={handlerLogout}
            >
                Выйти
            </a>
        </nav>
    )
}