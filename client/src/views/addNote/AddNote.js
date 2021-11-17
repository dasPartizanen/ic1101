import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';

import { InputField } from '../../components/InputField/InputField';
import { TextareaField } from '../../components/TextareaField/TextareaField';
import { Button } from '../../components/Button/Button';
import { Message } from '../../components/Message/Message';

import './addNote.scss'

export const AddNote = () => {
    const [form, setForm] = useState({
        title: '',
        text: ''
    })
    const [message, setMessage] = useState('')

    const auth = useContext(AuthContext)
    const history = useHistory()
    const {loading, error, request, clearError} = useHttp()

    useEffect( () => {
        setMessage(error)
    }, [error])

    const handlerChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handlerAdd = async (e) => {
        e.preventDefault()
        clearError()
        try {
            const data = await request(
                '/api/note/add',
                'POST',
                {...form},
                {
                    Authorization: `Bearer ${auth.token}`
                }
            )
            history.push(`/note/${data._id}`)
            setForm({
                title: '',
                text: '',
            })
        } catch (e) {}
    }

    return (
        <section className='addNote'>
            <h2 className='addNote_heading'>Новая заметка</h2>
            <form className='addNote_form'>
                <InputField
                    fieldName='Title'
                    fieldId='title'
                    mixClass='addNote_field'
                    inputValue={form.title}
                    onChange={handlerChange}
                />
                <TextareaField
                    fieldName='Text'
                    fieldId='text'
                    mixClass='addNote_field addNote_field__text'
                    textareaValue={form.text}
                    onChange={handlerChange}
                />
                <Button
                    mixClass='addNote_button'
                    onClick={handlerAdd}
                    isDisabled={loading}
                >
                    Добавить
                </Button>
            </form>
            {message && <Message text={message} />}
        </section>
    )
}