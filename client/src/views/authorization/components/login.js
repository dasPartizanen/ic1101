import React, { useState, useContext } from 'react';
import { useHttp } from '../../../hooks/http.hook';

import { AuthContext } from '../../../context/AuthContext';

import { InputField } from '../../../components/InputField/InputField';
import { Button } from '../../../components/Button/Button';
import { TextLink } from '../../../components/TextLink/TextLink';
import { Message } from '../../../components/Message/Message';

import '../authorization.scss'

export const Login = () => {
    const auth = useContext(AuthContext)
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handlerChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handlerAuthorisation = async (e) => {
        e.preventDefault()
        clearError()
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId, data.name)
        } catch (e) {}
    }

    return (
        <div className='authorization_body'>
            <h1 className='authorization_heading'>Вход</h1>
            <form className='authorization_form'>
                <InputField
                    fieldName='Email'
                    fieldId='email'
                    type='email'
                    mixClass='authorization_field'
                    onChange={handlerChange}
                />
                <InputField
                    fieldName='Password'
                    fieldId='password'
                    type='password'
                    mixClass='authorization_field'
                    onChange={handlerChange}
                />
                <Button
                    mixClass='authorization_button'
                    onClick={handlerAuthorisation}
                    isDisabled={loading}
                >
                    Войти
                </Button>
            </form>
            <TextLink
                mixClass='authorization_link'
                path='/reg'
            >
                Регистрация
            </TextLink>
            {error && <Message text={error} />}
        </div>
    )
}