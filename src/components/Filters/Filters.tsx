import React from 'react'
import { Box, Button } from '@mui/material'
import InputField from '../Filters/InputField'
import { Filter, FiltersProps } from '../../utils/types/types'

const Filters: React.FC<FiltersProps> = ({
    filters,
    onFilterChange,
    onApplyFilters,
    onResetFilters,
}) => {
    return (
        <Box display="flex" gap={2} alignItems="center" mb={3}>
            {Object.keys(filters).map((key: string) => (
                <InputField
                    key={key}
                    label={`Filter by ${key}`}
                    value={filters[key as keyof Filter]}
                    onChange={(e) =>
                        onFilterChange(key as keyof Filter, e.target.value)
                    }
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
