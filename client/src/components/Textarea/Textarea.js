import React, {useCallback} from 'react'

import classNames from 'classnames';

import './textarea.scss'

const Textarea = (props) => {
    const {
        mixClass,
        textareaId,
        onChange,
        textareaValue
    } = props
    const classSet = classNames('textarea', mixClass )

    const handlerChange = useCallback( (e) => {
        if (onChange) {
            onChange(e)
        }
    }, [onChange])

    return (
        <textarea
            className={classSet}
            id={textareaId}
            name={textareaId}
            value={textareaValue}
            onChange={handlerChange}
        />
    )
}

export { Textarea }