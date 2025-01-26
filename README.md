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

## Server Usage Instruction

# Documentation of the code

## Documentation of the Client code

## Documentation of the Server code
