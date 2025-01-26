import React from 'react'
import { Box, Button } from '@mui/material'
import InputField from '../Filters/InputField'
import { FiltersProps } from '../../utils/types/types'

const Filters: React.FC<FiltersProps> = ({
    filters,
    onFilterChange,
    onApplyFilters,
    onResetFilters,
}) => {
    return (
        <Box display="flex" gap={2} alignItems="center" mb={3}>
            {Object.keys(filters).map((filter: string) => (
                <InputField
                    key={filter}
                    label={`Filter by ${filter}`}
                    value={filters[filter]}
                    onChange={(e) => onFilterChange(filter, e.target.value)}
                    variant="outlined"
                    size="small"
                />
            ))}

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
