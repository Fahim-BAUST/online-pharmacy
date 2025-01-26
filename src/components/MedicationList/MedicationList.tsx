import React, { useState } from 'react'
import { Box, CircularProgress, TablePagination } from '@mui/material'
import Filters from '../Filters/Filters'
import MedicationTable from './MedicationTable'
import { medications } from '../../utils/data'

interface Medication {
    id: number
    name: string
    description: string
    manufacturer: string
    price: number
}

const MedicationList: React.FC = () => {
    const [filters, setFilters] = useState({
        name: '',
        description: '',
        manufacturer: '',
    })
    const [filteredMedications, setFilteredMedications] = useState(medications)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const applyFilters = () => {
        setLoading(true)
        const results = medications.filter((medication: Medication) =>
            Object.keys(filters).every((key) =>
                filters[key as keyof typeof filters]
                    ? medication[key as keyof typeof filters]
                          .toString()
                          .toLowerCase()
                          .includes(
                              filters[key as keyof typeof filters].toLowerCase()
                          )
                    : true
            )
        )
        setFilteredMedications(results)
        setPage(0)
        setLoading(false)
    }

    const resetFilters = () => {
        setFilters({ name: '', description: '', manufacturer: '' })
        setFilteredMedications(medications)
    }

    const handleSortChange = () => {
        if (sortOrder === null) {
            setSortOrder('asc')
            setFilteredMedications((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            )
        } else if (sortOrder === 'asc') {
            setSortOrder('desc')
            setFilteredMedications((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            )
        } else {
            setSortOrder(null)
            setFilteredMedications([...medications]) // Reset to default
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

    return (
        <Box sx={{ px: 4 }}>
            <Filters
                filters={filters}
                onFilterChange={handleFilterChange}
                onApplyFilters={applyFilters}
                onResetFilters={resetFilters}
            />

            {loading ? (
                <CircularProgress />
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
