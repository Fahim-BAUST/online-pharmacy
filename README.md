# Project Description

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

## Documentation of the Server code

## Prerequisites

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
