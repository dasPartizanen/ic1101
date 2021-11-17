import React from 'react';

import { Registration } from './components/registration';
import { Login } from './components/login';

import './authorization.scss'

export const Authorization = (props) => {
    const { registration } = props

    const content = registration ? <Registration /> : <Login />

    return (
        <div className='authorization'>
            {content}
        </div>
    )
}