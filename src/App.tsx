import React from 'react'
import './App.css'
import MedicationList from './components/MedicationList/MedicationList'
import { Typography } from '@mui/material'

function App() {
    return (
        <>
            <Typography variant="h3" sx={{ mb: 4 }} textAlign="center">
                Online Pharmacy
            </Typography>
            <MedicationList />
        </>
    )
}

export default App
