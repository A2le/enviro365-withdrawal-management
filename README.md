# Enviro365 Withdrawal Management System

## Overview

This project was developed as part of the Enviro365 Junior Developer Assessment.

The solution consists of:

* A Spring Boot backend API responsible for portfolio management, withdrawal processing, validation, CSV export, and business rule enforcement.
* A React frontend that allows users to view portfolios, create withdrawals, view withdrawal history, and export withdrawal statements.

---

## Technology Stack

### Backend

* Java 21
* Spring Boot 3.5.x
* Spring Data JPA
* H2 Database
* Maven
* Lombok
* OpenAPI / Swagger

### Frontend

* React
* Vite
* Material UI
* Axios

---

## Repository Structure

```text
.
├── giftntintiliapi
│   ├── pom.xml
│   └── src
│
├── enviro365-withdrawal-ui
│   ├── package.json
│   └── src
│
├── run.sh
└── README.md
```

---

## Features

### Portfolio Management

* View investor information
* View investment products
* View product balances

### Withdrawal Management

* Create withdrawal requests
* Apply business rule validation
* Automatically update balances

### Withdrawal History

* View all withdrawals
* Track historical remaining balances

### CSV Statement Export

* Export withdrawal records as CSV
* Filter exports by investor

### API Documentation

Swagger/OpenAPI documentation available at:

```text
http://localhost:8080/swagger-ui.html
```

---

## Business Rules

### Retirement Products

Withdrawals from retirement products are only allowed when the investor is older than 65 years.

### Balance Validation

Withdrawals cannot exceed the available balance.

### Maximum Withdrawal Rule

Withdrawals cannot exceed 90% of the product balance.

---

## Running The Application

### Option 1 - Using the Startup Script

From the repository root:

```bash
chmod +x run.sh
./run.sh
```

This will:

* Start the Spring Boot backend
* Install frontend dependencies if needed
* Start the React frontend

---

### Option 2 - Run Individually

#### Backend

```bash
cd giftntintiliapi
mvn spring-boot:run
```

#### Frontend

```bash
cd enviro365-withdrawal-ui
npm install
npm run dev
```

---

## Application URLs

### Frontend

```text
http://localhost:5173
```

### Backend API

```text
http://localhost:8080
```

### Swagger UI

```text
http://localhost:8080/swagger-ui.html
```

### H2 Console

```text
http://localhost:8080/h2-console
```

---

## Author

Athule Gift

Enviro365 Junior Developer Assessment Submission
