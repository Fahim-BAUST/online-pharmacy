import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import MedicationTable from '../components/MedicationList/MedicationTable'

const mockMedications = [
    {
        id: 1,
        name: 'Paracetamol',
        description: 'Pain reliever and fever reducer',
        manufacturer: 'PharmaCorp',
        price: 5.5,
    },
    {
        id: 2,
        name: 'Ibuprofen',
        description: 'Anti-inflammatory drug',
        manufacturer: 'MediHealth',
        price: 7.25,
    },
]

describe('MedicationTable Component', () => {
    it('renders table headers correctly', () => {
        render(
            <MedicationTable
                medications={mockMedications}
                sortOrder={null}
                onSortChange={jest.fn()}
            />
        )

        expect(screen.getByText('ID')).toBeInTheDocument()
        expect(screen.getByText('Name')).toBeInTheDocument()
        expect(screen.getByText('Description')).toBeInTheDocument()
        expect(screen.getByText('Manufacturer')).toBeInTheDocument()
        expect(screen.getByText('Price ($)')).toBeInTheDocument()
    })

    it('renders medications data correctly', () => {
        render(
            <MedicationTable
                medications={mockMedications}
                sortOrder={null}
                onSortChange={jest.fn()}
            />
        )

        mockMedications.forEach((medication) => {
            expect(screen.getByText(medication.name)).toBeInTheDocument()
            expect(screen.getByText(medication.description)).toBeInTheDocument()
            expect(
                screen.getByText(medication.manufacturer)
            ).toBeInTheDocument()
            expect(
                screen.getByText(medication.price.toFixed(2))
            ).toBeInTheDocument()
        })
    })

    it('renders a message when no medications are found', () => {
        render(
            <MedicationTable
                medications={[]}
                sortOrder={null}
                onSortChange={jest.fn()}
            />
        )

        expect(screen.getByText('No medications found.')).toBeInTheDocument()
    })

    it('calls onSortChange when the sort label is clicked', () => {
        const mockOnSortChange = jest.fn()

        render(
            <MedicationTable
                medications={mockMedications}
                sortOrder={null}
                onSortChange={mockOnSortChange}
            />
        )

        const sortLabel = screen.getByText('Price ($)')
        fireEvent.click(sortLabel)

        expect(mockOnSortChange).toHaveBeenCalledTimes(1)
    })
})
