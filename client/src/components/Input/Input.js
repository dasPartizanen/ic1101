import React, {useCallback} from 'react'

import classNames from 'classnames';

import './input.scss'

const Input = (props) => {
    const {
        mixClass,
        type,
        inputId,
        onChange,
        inputValue
    } = props
    const classSet = classNames('input', mixClass )

    const handlerChange = useCallback( (e) => {
        if (onChange) {
            onChange(e)
        }
    }, [onChange])

    return (
        <input
            className={classSet}
            type={type}
            id={inputId}
            name={inputId}
            value={inputValue}
            onChange={handlerChange}
        />
    )
}

export { Input }