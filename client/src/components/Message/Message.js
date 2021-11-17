import React from 'react'

import './message.scss'

export const Message = (Props) => {
    const { text } = Props

    return (
        <div className='message'>
            {text}
        </div>
    )
}
