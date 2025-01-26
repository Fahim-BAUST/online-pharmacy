import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import MedicationList from '../components/MedicationList/MedicationList'
import { fetchMedications } from '../services/api'

// Mock the API call
jest.mock('../services/api', () => ({
    fetchMedications: jest.fn(),
}))

describe('MedicationList Component', () => {
    const mockMedications = [
        {
            id: 1,
            name: 'Aspirin',
            description: 'Pain reliever',
            manufacturer: 'Pharma Inc',
            price: 5,
        },
        {
            id: 2,
            name: 'Ibuprofen',
            description: 'Anti-inflammatory',
            manufacturer: 'HealthCo',
            price: 8,
        },
    ]

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders MedicationList component without crashing', async () => {
        ;(fetchMedications as jest.Mock).mockResolvedValue(mockMedications)
        render(<MedicationList />)
        expect(screen.getByTestId('medication-list')).toBeInTheDocument()
        await waitFor(() =>
            expect(screen.getByText(/aspirin/i)).toBeInTheDocument()
        )
    })

    test('displays a loading state while fetching medications', async () => {
        ;(fetchMedications as jest.Mock).mockImplementation(
            () =>
                new Promise((resolve) =>
                    setTimeout(() => resolve(mockMedications), 500)
                )
        )
        render(<MedicationList />)
        expect(screen.getByTestId('skeleton'))
        await waitFor(() =>
            expect(screen.getByText(/aspirin/i)).toBeInTheDocument()
        )
    })

    test('displays error message if API call fails', async () => {
        ;(fetchMedications as jest.Mock).mockRejectedValue(
            new Error('API error')
        )
        render(<MedicationList />)
        await waitFor(() =>
            expect(screen.getByText(/api error/i)).toBeInTheDocument()
        )
    })

    test('applies filters correctly', async () => {
        ;(fetchMedications as jest.Mock).mockResolvedValue(mockMedications)
        render(<MedicationList />)
        await waitFor(() =>
            expect(screen.getByText(/aspirin/i)).toBeInTheDocument()
        )

        const filterInput = screen.getByLabelText(/Filter by Name/i)
        fireEvent.change(filterInput, { target: { value: 'Ibuprofen' } })
        fireEvent.click(screen.getByText(/apply/i))

        expect(screen.queryByText(/aspirin/i)).not.toBeInTheDocument()
        expect(screen.getByText(/ibuprofen/i)).toBeInTheDocument()
    })

    test('handles sorting correctly', async () => {
        ;(fetchMedications as jest.Mock).mockResolvedValue(mockMedications)
        render(<MedicationList />)
        await waitFor(() =>
            expect(screen.getByText(/aspirin/i)).toBeInTheDocument()
        )

        fireEvent.click(screen.getByText(/price/i))
        expect(screen.getByText(/aspirin/i)).toBeInTheDocument()
    })
})
