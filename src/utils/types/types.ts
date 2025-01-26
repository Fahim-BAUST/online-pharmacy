import { TextFieldProps } from '@mui/material'

export interface Medication {
    id: number
    name: string
    description: string
    manufacturer: string
    price: number
}

export interface MedicationTableProps {
    medications: Medication[]
    sortOrder: 'asc' | 'desc' | null
    onSortChange: () => void
}
export interface Filter {
    name: string
    description: string
    manufacturer: string
}
export interface FiltersProps {
    filters: Filter
    onFilterChange: (key: keyof FiltersProps['filters'], value: string) => void
    onApplyFilters: () => void
    onResetFilters: () => void
}

export interface InputFieldProps {
    label: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    fullWidth?: boolean
    variant?: TextFieldProps['variant']
    size?: TextFieldProps['size']
}
