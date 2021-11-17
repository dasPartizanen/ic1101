import React, {useCallback} from 'react'

import classNames from 'classnames';

import './text-link.scss'

const TextLink = (props) => {
    const {
        mixClass,
        path,
        children,
        onClick
    } = props
    const classSet = classNames('text-link', mixClass )

    const handleClick = useCallback( (e) => {
        if (onClick) {
            onClick(e)
        }
    }, [onClick])

    return (
        <a
            className={classSet}
            href={path ?? path}
            onClick={handleClick}
        >
            { children }
        </a>
    )
}

export { TextLink }