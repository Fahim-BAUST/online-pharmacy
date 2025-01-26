import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
} from '@mui/material'

interface Medication {
    id: number
    name: string
    description: string
    manufacturer: string
    price: number
}

interface MedicationTableProps {
    medications: Medication[]
    sortOrder: 'asc' | 'desc' | null
    onSortChange: () => void
}

const MedicationTable: React.FC<MedicationTableProps> = ({
    medications,
    sortOrder,
    onSortChange,
}) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Manufacturer</TableCell>
                        <TableCell align="right">
                            <TableSortLabel
                                active={!!sortOrder}
                                direction={sortOrder || undefined}
                                onClick={onSortChange}
                            >
                                Price ($)
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {medications.map((medication) => (
                        <TableRow key={medication.id}>
                            <TableCell>{medication.id}</TableCell>
                            <TableCell>{medication.name}</TableCell>
                            <TableCell>{medication.description}</TableCell>
                            <TableCell>{medication.manufacturer}</TableCell>
                            <TableCell align="right">
                                {medication.price.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MedicationTable
