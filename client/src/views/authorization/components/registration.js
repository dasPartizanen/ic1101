import React, {useState, useEffect, useContext} from 'react'
import { useHttp } from '../../../hooks/http.hook';

import { AuthContext } from '../../../context/AuthContext';

import { InputField } from '../../../components/InputField/InputField';
import { Button } from '../../../components/Button/Button';
import { TextLink } from '../../../components/TextLink/TextLink';
import { Message } from '../../../components/Message/Message';

import '../authorization.scss'

export const Registration = () => {
    const auth = useContext(AuthContext)
    const {
        loading,
        error,
        request,
        clearError
    } = useHttp()

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
    })
    const [message, setMessage] = useState('')

    useEffect( () => {
        setMessage(error)
    }, [error])

    const handlerChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handlerRegistration = async (e) => {
        e.preventDefault()
        clearError()
        try {
            const data = await request('/api/auth/registration', 'POST', {...form})
            auth.login(data.token, data.userId, data.name)
        } catch (e) {}

    }

    return (
        <div className='authorization_body'>
            <h1 className='authorization_heading'>Регистрация</h1>
            <form className='authorization_form'>
                <InputField
                    fieldName='Name'
                    fieldId='name'
                    mixClass='authorization_field'
                    onChange={handlerChange}
                />
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
                    onClick={handlerRegistration}
                    isDisabled={loading}
                >
                    Зарегистрироваться
                </Button>
            </form>
            <TextLink
                mixClass='authorization_link'
                path='/auth'
            >
                Вход
            </TextLink>
            {message && <Message text={message} />} {/* TODO: вынести логику появления сообщеный в глобальную область */}
        </div>
    )
}
