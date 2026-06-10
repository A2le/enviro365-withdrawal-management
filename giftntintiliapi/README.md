# Enviro365 Withdrawal Management API

## Overview

This project was developed as part of the Enviro365 Junior Developer Assessment.

The application provides a RESTful API that allows investors to view their investment portfolios and submit withdrawal requests while enforcing specific business rules.

The solution is built using Spring Boot, Spring Data JPA, and an in-memory H2 database.

---

## Features

### Portfolio Management

* Retrieve an investor's portfolio
* View investor information
* View associated investment products
* View product balances and product types

### Withdrawal Processing

* Submit withdrawal requests
* Validate business rules before processing
* Automatically update product balances
* Store withdrawal history

### Withdrawal History

* Retrieve all withdrawal records
* View withdrawal amounts, dates, and related products

### CSV Export

* Export all withdrawal records as a CSV file

### Validation & Error Handling

* Request validation using Jakarta Validation
* Global exception handling
* Standardized API error responses

---

## Business Rules

The application enforces the following withdrawal rules:

### Retirement Products

Withdrawals from retirement products are only permitted when the investor is older than 65 years.

### Balance Validation

A withdrawal amount cannot exceed the available product balance.

### Maximum Withdrawal Limit

A withdrawal amount cannot exceed 90% of the product balance.

---

## Technology Stack

### Backend

* Java 21
* Spring Boot 3.5.x
* Spring Data JPA
* Maven
* Lombok
* H2 Database

### Testing

* JUnit 5
* Mockito

---

## Project Structure

```text
src/main/java/com.enviro.assessment.junior.giftntintili

├── config
├── controller
├── dto
├── entity
├── exception
├── repository
└── service
```

### Package Responsibilities

| Package    | Responsibility                             |
| ---------- | ------------------------------------------ |
| controller | REST API endpoints                         |
| service    | Business logic                             |
| repository | Database access                            |
| entity     | JPA entities                               |
| dto        | Request and response models                |
| exception  | Global exception handling                  |
| config     | Application configuration and data seeding |

---

## Database

The application uses an in-memory H2 database.

Sample data is automatically loaded on application startup using a CommandLineRunner.

### Sample Investors

#### John Smith

* Age: 70
* Retirement Annuity: R500,000
* Tax Free Savings: R150,000

#### Mary Johnson

* Age: 45
* Retirement Fund: R300,000
* Money Market Savings: R80,000

---

## API Endpoints

### Get Investor Portfolio

```http
GET /api/investors/{investorId}/portfolio
```

Example:

```http
GET /api/investors/1/portfolio
```

---

### Create Withdrawal

```http
POST /api/withdrawals
```

Request Body:

```json
{
  "productId": 1,
  "amount": 10000
}
```

---

### Get Withdrawal History

```http
GET /api/withdrawals
```

---

### Export Withdrawals

```http
GET /api/withdrawals/export
```

Downloads:

```text
withdrawals.csv
```

---

## Running the Application

### Prerequisites

* Java 21
* Maven 3.9+

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Project

```bash
cd giftntintiliapi
```

### Run Application

```bash
mvn spring-boot:run
```

Application starts on:

```text
http://localhost:8080
```

---

## H2 Database Console

URL:

```text
http://localhost:8080/h2-console
```

Connection Details:

```text
JDBC URL:
jdbc:h2:mem:envirodb

Username:
sa

Password:
(blank)
```
swagger url

```text
http://localhost:8080/swagger-ui/index.html
```
---

## Running Tests

```bash
mvn test
```

The test suite validates:

* Retirement age restrictions
* Balance validation
* Maximum withdrawal limits
* Withdrawal processing logic

---

## Design Decisions

### Layered Architecture

The application follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

This separation improves maintainability, testability, and readability.

### DTO Pattern

DTOs are used to separate API contracts from persistence models and prevent direct exposure of entities.

### Global Exception Handling

A centralized exception handling mechanism provides consistent and user-friendly error responses.

---

## Author

Athule Gift

Enviro365 Junior Developer Assessment Submission
