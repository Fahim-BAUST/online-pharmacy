import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import InputField from '../components/Filters/InputField'
import { InputFieldProps } from '../utils/types/types'

describe('InputField Component', () => {
    const defaultProps: InputFieldProps = {
        label: 'Test Label',
        value: '',
        onChange: jest.fn(),
        placeholder: 'Enter value',
        fullWidth: true,
        variant: 'outlined',
        size: 'small',
    }

    it('should render the component with required props', () => {
        render(<InputField {...defaultProps} />)
        const inputElement = screen.getByLabelText('Test Label')
        expect(inputElement).toBeInTheDocument()
        expect(inputElement).toHaveAttribute('placeholder', 'Enter value')
    })

    it('should call onChange when value changes', () => {
        const onChangeMock = jest.fn()
        render(<InputField {...defaultProps} onChange={onChangeMock} />)
        const inputElement = screen.getByLabelText('Test Label')

        fireEvent.change(inputElement, { target: { value: 'new value' } })
        expect(onChangeMock).toHaveBeenCalledTimes(1)
        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object))
    })
})
