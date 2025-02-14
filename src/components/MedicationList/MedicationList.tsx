import React, { useEffect, useState } from 'react'
import { Alert, Box, Skeleton, Snackbar, TablePagination } from '@mui/material'
import Filters from '../Filters/Filters'
import MedicationTable from './MedicationTable'
import { fetchMedications } from '../../services/api'
import { AlertSeverity, Filter, Medication } from '../../utils/types/types'

const MedicationList: React.FC = () => {
    const filterInitialValue: Filter = {
        name: '',
        description: '',
        manufacturer: '',
    }
    const [filters, setFilters] = useState(filterInitialValue)
    const [medications, setMedications] = useState<Medication[]>([])
    const [filteredMedications, setFilteredMedications] = useState(medications)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)
    const [alertState, setAlertState] = useState(false)
    const [alertSeverity, setAlertSeverity] = useState<AlertSeverity>('success')

    useEffect(() => {
        const loadMedications = async () => {
            setLoading(true)
            try {
                const data = await fetchMedications()
                setMedications(data)
                setFilteredMedications(data)
            } catch (error: any) {
                setAlertState(true)
                setAlertSeverity('error')
                setErrorMessage(error.message || 'An unknown error occurred.')
            } finally {
                setLoading(false)
            }
        }

        loadMedications()
    }, [])

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const applyFilters = () => {
        setLoading(true)

        // Filter the medications array based on the applied filters
        const results = medications.filter((medication) =>
            // Check if every filter condition is met
            Object.keys(filters).every((key) =>
                // If the filter for the current key exists and has a value
                filters[key as keyof typeof filters]
                    ? // Check if the medication property for the current key contains the filter value (case-insensitive)
                      medication[key as keyof typeof filters]
                          .toString()
                          .toLowerCase()
                          .includes(
                              filters[key as keyof typeof filters].toLowerCase() // Check if the medication value includes the filter value
                          )
                    : true
            )
        )

        setFilteredMedications(results)
        setPage(0)
        setLoading(false)
    }

    const resetFilters = () => {
        setFilters(filterInitialValue)
        setFilteredMedications(medications)
        setSortOrder(null)
    }

    const handleAscSort = (prev: typeof filteredMedications) => {
        return [...prev].sort((a, b) => a.price - b.price)
    }

    const handleDescSort = (prev: typeof filteredMedications) => {
        return [...prev].sort((a, b) => b.price - a.price)
    }

    const handleSortChange = () => {
        // Toggle the sorting order and apply the corresponding sorting logic
        const nextSortOrder =
            sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? null : 'asc'

        // Update the sort order
        setSortOrder(nextSortOrder)

        // Sort or reset filtered medications based on the new sort order
        if (nextSortOrder === 'asc') {
            setFilteredMedications((prev) => handleAscSort(prev))
        } else if (nextSortOrder === 'desc') {
            setFilteredMedications((prev) => handleDescSort(prev))
        } else {
            setFilteredMedications([...medications])
        }
    }

    const handleChangePage = (
        _: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => setPage(newPage)

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleAlertClose = () => {
        setAlertState(false)
    }

    return (
        <Box sx={{ px: 4 }} data-testid="medication-list">
            <Filters
                filters={filters}
                onFilterChange={handleFilterChange}
                onApplyFilters={applyFilters}
                onResetFilters={resetFilters}
            />

            {errorMessage && (
                <Snackbar
                    open={alertState}
                    autoHideDuration={6000}
                    onClose={handleAlertClose}
                >
                    <Alert
                        onClose={handleAlertClose}
                        severity={alertSeverity}
                        variant="filled"
                    >
                        {errorMessage}
                    </Alert>
                </Snackbar>
            )}

            {loading ? (
                <Box data-testid="skeleton">
                    {Array(5)
                        .fill(1)
                        .map((_, index) => (
                            <Skeleton key={index} height={60} />
                        ))}
                </Box>
            ) : (
                <>
                    <MedicationTable
                        medications={filteredMedications.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )}
                        sortOrder={sortOrder}
                        onSortChange={handleSortChange}
                    />
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[3, 5, 10]}
                        count={filteredMedications.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
        </Box>
    )
}

export default MedicationList
