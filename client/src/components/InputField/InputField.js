import React from 'react'

import classNames from 'classnames';

import {Input} from '../Input/Input';
import {Label} from '../Label/Label';

import './inputField.scss'

const InputField = (props) => {
    const {
        mixClass,
        type,
        fieldName,
        fieldId,
        onChange,
        inputValue
    } = props
    const classSet = classNames('inputField', mixClass )

    return (
        <div className={classSet}>
            <Label labelFor={fieldId}>
                {fieldName}
            </Label>
            <Input
                mixClass='inputField_input'
                type={type}
                inputId={fieldId}
                onChange={onChange}
                inputValue={inputValue}
            />
        </div>
    )
}

export { InputField }