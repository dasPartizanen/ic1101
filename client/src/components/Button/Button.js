import React, { useCallback } from 'react'

import classNames from 'classnames';

import './button.scss'

const Button = (props) => {
    const {
        mixClass,
        children,
        onClick,
        isDisabled
    } = props
    const classSet = classNames('button', mixClass )

    const handleClick = useCallback( (e) => {
        if (onClick) {
            onClick(e)
        }
    }, [onClick])

    return (
        <button
            className={classSet}
            onClick={handleClick}
            disabled={isDisabled}
        >
            { children }
        </button>
    )
}

export { Button }