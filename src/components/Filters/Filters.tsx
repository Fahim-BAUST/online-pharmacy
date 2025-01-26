import React from 'react'
import { Box, Button } from '@mui/material'
import InputField from '../Filters/InputField'

interface FiltersProps {
    filters: { name: string; description: string; manufacturer: string }
    onFilterChange: (key: keyof FiltersProps['filters'], value: string) => void
    onApplyFilters: () => void
    onResetFilters: () => void
}

const Filters: React.FC<FiltersProps> = ({
    filters,
    onFilterChange,
    onApplyFilters,
    onResetFilters,
}) => {
    return (
        <Box display="flex" gap={2} alignItems="center" mb={3}>
            <InputField
                label="Filter by Name"
                value={filters.name}
                onChange={(e) => onFilterChange('name', e.target.value)}
            />
            <InputField
                label="Filter by Description"
                value={filters.description}
                onChange={(e) => onFilterChange('description', e.target.value)}
            />
            <InputField
                label="Filter by Manufacturer"
                value={filters.manufacturer}
                onChange={(e) => onFilterChange('manufacturer', e.target.value)}
            />
            <Button variant="contained" onClick={onApplyFilters}>
                Apply
            </Button>
            <Button variant="outlined" onClick={onResetFilters}>
                Reset
            </Button>
        </Box>
    )
}

export default Filters
