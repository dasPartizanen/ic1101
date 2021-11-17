import React from 'react'

import classNames from 'classnames';

import './label.scss'

const Label = (props) => {
    const {
        mixClass,
        labelFor,
        children
    } = props
    const classSet = classNames('label', mixClass )

    return (
        <label
            className={classSet}
            htmlFor={labelFor}
        >
            {children}
        </label>
    )
}

export { Label }