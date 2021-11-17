import React from 'react';

import { TextLink } from '../../TextLink/TextLink';

import './noteMessage.scss'

export const NoteMessage = () => {
    return (
        <p className='noteMessage'>
            Заметок пока нет, <TextLink path='/add'>создать</TextLink>.
        </p>
    )
}
