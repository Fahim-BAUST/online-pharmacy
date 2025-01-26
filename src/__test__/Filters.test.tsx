import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Filters from '../components/Filters/Filters'

describe('Filters Component', () => {
    const mockFilters = {
        name: '',
        description: '',
        manufacturer: '',
    }

    const mockOnFilterChange = jest.fn()
    const mockOnApplyFilters = jest.fn()
    const mockOnResetFilters = jest.fn()

    const renderComponent = (filters = mockFilters) => {
        render(
            <Filters
                filters={filters}
                onFilterChange={mockOnFilterChange}
                onApplyFilters={mockOnApplyFilters}
                onResetFilters={mockOnResetFilters}
            />
        )
    }

    it('should render all filter input fields and buttons', () => {
        renderComponent()

        // Check input fields
        expect(screen.getByLabelText('Filter by Name')).toBeInTheDocument()
        expect(
            screen.getByLabelText('Filter by Description')
        ).toBeInTheDocument()
        expect(
            screen.getByLabelText('Filter by Manufacturer')
        ).toBeInTheDocument()

        // Check buttons
        expect(
            screen.getByRole('button', { name: 'Apply' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Reset' })
        ).toBeInTheDocument()
    })

    it('should call onFilterChange when typing in input fields', () => {
        renderComponent()

        const nameInput = screen.getByLabelText('Filter by Name')
        const descriptionInput = screen.getByLabelText('Filter by Description')
        const manufacturerInput = screen.getByLabelText(
            'Filter by Manufacturer'
        )

        fireEvent.change(nameInput, { target: { value: 'Test Name' } })
        fireEvent.change(descriptionInput, {
            target: { value: 'Test Description' },
        })
        fireEvent.change(manufacturerInput, {
            target: { value: 'Test Manufacturer' },
        })

        expect(mockOnFilterChange).toHaveBeenCalledTimes(3)
        expect(mockOnFilterChange).toHaveBeenCalledWith('name', 'Test Name')
        expect(mockOnFilterChange).toHaveBeenCalledWith(
            'description',
            'Test Description'
        )
        expect(mockOnFilterChange).toHaveBeenCalledWith(
            'manufacturer',
            'Test Manufacturer'
        )
    })

    it('should call onApplyFilters when the Apply button is clicked', () => {
        renderComponent()

        const applyButton = screen.getByRole('button', { name: 'Apply' })
        fireEvent.click(applyButton)

        expect(mockOnApplyFilters).toHaveBeenCalledTimes(1)
    })

    it('should call onResetFilters when the Reset button is clicked', () => {
        renderComponent()

        const resetButton = screen.getByRole('button', { name: 'Reset' })
        fireEvent.click(resetButton)

        expect(mockOnResetFilters).toHaveBeenCalledTimes(1)
    })

    it('should display initial filter values in input fields', () => {
        const customFilters = {
            name: 'Initial Name',
            description: 'Initial Description',
            manufacturer: 'Initial Manufacturer',
        }

        renderComponent(customFilters)

        expect(screen.getByLabelText('Filter by Name')).toHaveValue(
            'Initial Name'
        )
        expect(screen.getByLabelText('Filter by Description')).toHaveValue(
            'Initial Description'
        )
        expect(screen.getByLabelText('Filter by Manufacturer')).toHaveValue(
            'Initial Manufacturer'
        )
    })
})
