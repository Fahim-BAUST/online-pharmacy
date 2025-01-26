# Project Description

The Online Pharmacy Project is a web-based application designed to streamline and enhance the process of managing and searching for medications. This project leverages modern web technologies, reusable components, and TypeScript for a robust, user-friendly experience. The system allows users to view, filter, sort, and manage a catalog of medications efficiently, catering to the needs of both customers and administrators.

# Setup Instructions

## Client Setup Instruction

### Overview

This project is built using React, TypeScript, ESLint, Prettier, and Jest for testing. Below is a detailed setup guide to configure and maintain the development environment.

### Prerequisites

Make sure you have the following installed:

- Node.js (Recommended version: 16.x or above)
- npm (comes with Node.js)
- Git (optional for version control)

### Project Setup

1. Clone the repository
   If you haven’t already cloned the repository, use the following command:

```bash

git clone <repository-url>
cd <project-folder>
```

2. Install Dependencies
   Run the following command to install the required dependencies:

```bash

npm install
```

---

## Server Side Setup Instruction

This project is a Node.js + TypeScript-based API for managing pharmacy-related data, connecting to a MongoDB database hosted on MongoDB Atlas. The API allows fetching data from the `medicines` collection.

### Prerequisites

Make sure you have the following installed on your system:

1. [Node.js](https://nodejs.org/) (v16 or later)
2. [npm](https://www.npmjs.com/) (bundled with Node.js)
3. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account with a configured database and collection.
4. Create a database and collection , then import medicines.json file

---

### Setup

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

then

```bash
cd server
```

#### 1. Install Dependencies

Install Dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

Create a .env file in the root folder and add the following variables:

```bash
DB_USER=baustcse160201103
DB_PASSWORD=publ8U73HzAg8xPz
```

Explanation of Variables:

- DB_USER: Your MongoDB Atlas username.
- DB_PASSWORD: Your MongoDB Atlas password.
- API_SECRET_CODE: An optional API secret (not used in this project but reserved for future security).

#### 4. Start the Server

```bash
npm start
```

# Usage instructions

## Client Usage Instruction

After running the project, you will see a table of medicines data with the following features:

#### Pagination

- Navigate through the table using the pagination controls.
- Filtering

Filter the data based on:

- Name: Search medicines by their name.
- Description: Search using keywords in the description.
- Manufacturer: Search by the name of the manufacturer.

Sorting

- Sort the medicines by their Price (ascending or descending).

These features provide an intuitive and interactive way to explore the medicines dataset. Let me know if you'd like additional details!

## Server Usage Instruction

#### Usage Instructions

Once the server is running, you can use the following instructions to interact with the API.

1. Fetch All Medicines Data
   Use this endpoint to retrieve data from the medicines collection.

##### Request

- URL: http://localhost:3001/api/table-data
- Method: GET
- Headers: None required.
- Body: None required.

##### Response

- Status Code: 200 OK
- Body: returned array of items

#### How to Test the API

You can test the API using any of the following tools:

##### Postman:

Open Postman and create a new request.

- Set the URL to http://localhost:3001/api/table-data.
- Set the method to GET.
- Send the request and inspect the response.

cURL: Run the following command in your terminal to test the /api/table-data endpoint:

```bash
curl -X GET http://localhost:3001/api/table-data
```

Browser: Open your browser and navigate to:

- http://localhost:3001/ to check the root endpoint.
- http://localhost:3001/api/table-data to test the API.

---

# Documentation of the code

## Documentation of the Client code

### Key Features

#### 1. Dynamic Table Rendering

- Displays medications in a tabular format.

- Supports sorting by any table column (e.g., price).

- Includes pagination for large datasets.

#### 2. Filtering Mechanism

- Allows filtering medications by name, description, and manufacturer.

- Filters are dynamically generated based on the keys in the filters object.

#### 3. Reusable Components

- InputField for user inputs.

- MedicationTable for displaying sorted and filtered medication data.

#### 4. TypeScript Integration

- Strongly typed interfaces ensure type safety and prevent runtime errors.

### Code Walkthrough

#### App Component

In this component render the application title and MedicationList component to show the medication list table and filters

```bash
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
```

#### InputField Component

A reusable component for rendering labeled input fields.

```bash
import React from 'react'
import { TextField } from '@mui/material'
import { InputFieldProps } from '../../utils/types/types'

const InputField: React.FC<InputFieldProps> = ({
label,
value,
onChange,
placeholder = 'Enter value',
fullWidth,
variant,
size,
}) => {
return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            fullWidth={fullWidth}
            variant={variant}
            size={size}
        />
)
}

export default InputField
```

#### Filters Component

A component for rendering filters, apply and reset button and handle input fields.

```bash
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
```

#### MedicationList Component

Handles the logic of the getting medicines list, filter and sorting.

```bash
import React, { useEffect, useState } from 'react'
import { Alert, Box, Skeleton, Snackbar, TablePagination } from '@mui/material'
import Filters from '../Filters/Filters'
import MedicationTable from './MedicationTable'
import { fetchMedications } from '../../services/api'
import { Filter, Medication } from '../../utils/types/types'

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
```

#### MedicationTable Component

Handles the rendering of the medication list in a table format, with sorting support.

```bash
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
import { MedicationTableProps } from '../../utils/types/types'

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
                    {medications?.length ? (
                        medications?.map((medication) => (
                            <TableRow key={medication.id}>
                                <TableCell>{medication.id}</TableCell>
                                <TableCell>{medication.name}</TableCell>
                                <TableCell>{medication.description}</TableCell>
                                <TableCell>{medication.manufacturer}</TableCell>
                                <TableCell align="right">
                                    {medication.price.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} align="center">
                                No medications found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MedicationTable
```

#### Types

Defines the interfaces and types used throughout the project.

```bash
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
    onFilterChange: (key: keyof Filter, value: string) => void
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

export type AlertSeverity = 'error' | 'warning' | 'info' | 'success'
```

## Documentation of the Server code

### Prerequisites

Before running the project, ensure you have the following installed:

1. Node.js (v16 or higher)
2. MongoDB Atlas account
3. A `.env` file with the correct credentials.

---

#### Environment Variables

Create a `.env` file in the root of your project and add the following:

```env
DB_USER=baustcse160201103
DB_PASSWORD=publ8U73HzAg8xPz
```

#### Code Structure

The main file for the project is index.ts. It:

- Initializes the Express server.
- Connects to the MongoDB Atlas database.
- Defines API endpoints.

### Detailed Code Explanation

#### Imports and Configurations

```bash
import express, { Request, Response } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
```

- Express: Used to create API endpoints.
- MongoClient: Manages MongoDB connections.
- dotenv: Loads environment variables from .env.
- CORS: Enables Cross-Origin Resource Sharing.

#### MongoDB Connection

```bash
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@medicines.srxzb.mongodb.net/?retryWrites=true&w=majority&appName=medicine`;

const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

```

- MONGO_URI: Dynamically generates the connection string using credentials from .env.
- client: Configures the MongoDB client with best practices using ServerApiVersion.

#### Express Middleware

```typescript
const app = express()
app.use(cors())
app.use(express.json())
```

- CORS: Allows API requests from different origins.
- express.json(): Parses incoming JSON request bodies.

#### API Endpoints

Welcome Route

```typescript
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the API!')
})
```

Fetch Medicines Data

```typescript
app.get('/api/table-data', async (req: Request, res: Response) => {
    try {
        const tableData = medicineCollection.find({})
        const result = await tableData.toArray()

        res.status(200).json(result.length > 0 ? result : [])
    } catch (error) {
        console.error('Error fetching table data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
```

- Route: /api/table-data
- Method: GET
- Description: Fetches all documents from the medicines collection.
  Response:
- 200 OK: Returns an array of medicines.
- 500 Internal Server Error: Logs the error and returns a message.

Starting the Server

```typescript
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
```

The server listens on port 3001 by default.
