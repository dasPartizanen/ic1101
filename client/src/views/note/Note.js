import React, {useCallback, useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook';
import {AuthContext} from '../../context/AuthContext';

import {Loader} from '../../components/Loader/Loader';

import './note.scss'

export const Note = () => {
    const [note, setNote] = useState(null)
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)
    const noteId = useParams().id

    const getNote = useCallback( async () => {
        try {
            const data = await request(`/api/note/${noteId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setNote(data)
        } catch (e) {}
    }, [token, request, noteId]) // TODO: Показывать только владельцу note

    useEffect( () => {
        getNote()
    }, [getNote])

    if (loading) {
        return <Loader fullScreen />
    }

    return (
        <article className='note'>
            <h2 className='note_heading'>
                {note && note.title}
            </h2>
            <p className='note_text'>
                {note && note.text}
            </p>
        </article>
    )
}