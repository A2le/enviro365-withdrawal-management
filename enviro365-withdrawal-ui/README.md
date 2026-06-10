# Enviro365 Withdrawal Management UI

## Overview

This project was developed as part of the Enviro365 Junior Developer Assessment.

The application provides a user interface for investors to:

* View portfolio information
* View investment products and balances
* Submit withdrawal requests
* View withdrawal history
* Export withdrawal records as a CSV file

The frontend consumes the Spring Boot backend API and presents the data in a simple and responsive dashboard.

---

## Features

### Portfolio Dashboard

* Displays investor information
* Displays investment products
* Displays current product balances
* Displays product types

### Withdrawal Management

* Create withdrawal requests
* Select investment products
* Enter withdrawal amounts
* Receive validation and business rule feedback

### Withdrawal History

* View all submitted withdrawals
* View withdrawal amounts
* View withdrawal dates
* View remaining balances after withdrawal

### CSV Export

* Download all withdrawal records as a CSV file

---

## Technology Stack

### Frontend

* React 19
* Vite
* Material UI (MUI)
* Axios

### Backend Integration

This application consumes the Enviro365 Withdrawal Management API built with:

* Spring Boot
* Spring Data JPA
* H2 Database

---

## Project Structure

```text
src

├── api
│   └── axios.js
│
├── services
│   └── withdrawalService.js
│
├── pages
│   └── Dashboard.jsx
│
├── components
│   ├── PortfolioCard.jsx
│   ├── WithdrawalForm.jsx
│   ├── WithdrawalHistory.jsx
│   └── CsvExportButton.jsx
│
├── App.jsx
└── main.jsx
```

---

## Prerequisites

Before running the frontend application, ensure that:

* Node.js 20+ is installed
* The backend API is running on:

```text
http://localhost:8080
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd enviro365-withdrawal-ui
```

Install dependencies:

```bash
npm install
```

---

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

or the next available Vite port.

---

## Backend Configuration

The frontend uses Axios to communicate with the backend API.

Current configuration:

```javascript
baseURL: 'http://localhost:8080/api'
```

If the backend URL changes, update:

```text
src/api/axios.js
```

---

## Available Functionality

### View Portfolio

Displays:

* Investor Name
* Investor Age
* Product Name
* Product Type
* Product Balance

### Create Withdrawal

Allows the user to:

* Select a product
* Enter a withdrawal amount
* Submit a withdrawal request

Business rule validation messages are displayed when a request is invalid.

### View Withdrawal History

Displays:

* Product Name
* Withdrawal Amount
* Remaining Balance
* Withdrawal Date

### Export Withdrawals

Downloads:

```text
withdrawals.csv
```

containing all withdrawal records.

---

## Author

Athule Gift

Enviro365 Junior Developer Assessment Submission
