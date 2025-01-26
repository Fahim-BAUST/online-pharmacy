import React from 'react'
import { TextField } from '@mui/material'

interface InputFieldProps {
    label: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    fullWidth?: boolean
    size?: string
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChange,
    placeholder = 'Enter value',
    fullWidth,
}) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            fullWidth={fullWidth}
            variant="outlined"
            size="small"
        />
    )
}

export default InputField
