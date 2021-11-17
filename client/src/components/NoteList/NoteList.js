import React, { useState, useCallback } from 'react';

import { NoteItem } from './NoteItem/NoteItem';
import { NoteMessage } from './NoteMessage/NoteMessage';
import { Message } from '../Message/Message';

import './noteList.scss'

export const NoteList = (props) => {
    const [message, setState] = useState(null)
    const { notes, getNotes } = props

    const showMessage = useCallback((error) => {
        setState(error)
    }, [setState])

    return (
        <section className='noteList'>
            <h2 className='noteList_heading'>Заметки</h2>
            <div className='noteList_content'>
                {!notes.length && <NoteMessage />}
                {notes && notes.map((note) =>
                    <NoteItem
                        key={note._id}
                        note={note}
                        showMessage={showMessage}
                        getNotes={getNotes}
                    />
                )}
            </div>
            {message && <Message text={message} />}
        </section>
    )
}