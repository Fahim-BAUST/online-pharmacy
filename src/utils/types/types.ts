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

export interface FiltersProps {
    filters: { name: string; description: string; manufacturer: string }
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
    size?: string
}
