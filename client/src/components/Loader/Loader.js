import React from 'react';

import classNames from 'classnames';

import './loader.scss'

export const Loader = (props) => {
    const {
        mixClass,
        fullScreen
    } = props

    const classSet = classNames(
        'loader',
        fullScreen && 'loader__fullScreen',
        mixClass
    )

    return (
        <div className={classSet}>
            <div className='loader_ring'/>
        </div>
    )
}
