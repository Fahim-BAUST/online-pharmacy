import React from 'react'
import { TextField } from '@mui/material'
import { InputFieldProps } from '../../utils/types/types'

const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChange,
    placeholder = 'Enter value',
    fullWidth,
    variant,
    size,
}) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            fullWidth={fullWidth}
            variant={variant}
            size={size}
        />
    )
}

export default InputField
