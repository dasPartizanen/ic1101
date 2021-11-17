import React, { useContext, useEffect } from 'react';
import { useHttp } from '../../../hooks/http.hook';

import {AuthContext} from '../../../context/AuthContext';

import './noteItem.scss'

export const NoteItem = (props) => {
    const {note, showMessage, getNotes} = props
    const {token} = useContext(AuthContext)
    const {request, error, clearError} = useHttp()
    const noteId = note._id

    const noteLink = `/note/${noteId}`

    const dateCreated = new Date(note.date).toLocaleDateString()

    useEffect(() => {
        showMessage(error)
    }, [error, showMessage])

    const handlerDell = async (e) => {
        e.preventDefault()
        clearError()
        try {
            await request(`/api/note/del/${noteId}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            await getNotes() // TODO: Обновление note черерез hook, а не передача по Props
        } catch (e) {}
    }

    return (
        <div className='noteItem'>
            <a
                className='noteItem_link'
                href={noteLink}
            >
                <h3 className='noteItem_heading'>{note.title}</h3>
                <time
                    className='noteItem_date'
                    dateTime={note.date}
                >
                    {dateCreated}
                </time>
            </a>
            <button
                className='noteItem_dell'
                onClick={handlerDell}
            />
        </div>
    )
}
