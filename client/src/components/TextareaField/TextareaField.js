import React from 'react'

import classNames from 'classnames';

import { Textarea } from '../Textarea/Textarea';
import { Label } from '../Label/Label';

import './textareaField.scss'

const TextareaField = (props) => {
    const {
        mixClass,
        fieldName,
        fieldId,
        onChange,
        textareaValue
    } = props
    const classSet = classNames('textareaField', mixClass )

    return (
        <div className={classSet}>
            <Label labelFor={fieldId}>
                {fieldName}
            </Label>
            <Textarea
                mixClass='textareaField_textarea'
                textareaId={fieldId}
                onChange={onChange}
                textareaValue={textareaValue}
            />
        </div>
    )
}

export { TextareaField }