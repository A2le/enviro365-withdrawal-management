# Enviro365 Withdrawal Management

A full-stack investment withdrawal management system built with Spring Boot and React. Investors can view their portfolio, submit withdrawal requests, review their withdrawal history, and export records to CSV.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Backend | Java 21, Spring Boot 3.5, Spring Data JPA, Spring Security, H2 |
| Frontend | React 19, Vite, Material UI, Axios |
| Auth | HTTP Basic with BCrypt-hashed passwords |

---

## Prerequisites

Before running the project, make sure you have the following installed:

- **Java 21** — [Download](https://adoptium.net/)
- **Maven 3.9+** — [Download](https://maven.apache.org/download.cgi) (or use the included `mvnw` wrapper)
- **Node.js 18+** — [Download](https://nodejs.org/)
- **npm 9+** — bundled with Node.js

Verify your versions:

```bash
java -version
mvn -version   # or ./mvnw -version
node -version
npm -version
```

---

## Project Structure

```
enviro365-withdrawal-management/
├── giftntintiliapi/          # Spring Boot backend (port 8080)
└── enviro365-withdrawal-ui/  # React + Vite frontend (port 5173)
```

---

## 1. Backend Setup

### Navigate to the backend directory

```bash
cd giftntintiliapi
```

### Run the application

Using Maven wrapper (no Maven installation required):

```bash
./mvnw spring-boot:run
```

Or with Maven installed globally:

```bash
mvn spring-boot:run
```

The API starts at `http://localhost:8080`.

> The H2 database is **in-memory** — data resets every time the backend restarts. Sample investors and accounts are seeded automatically on startup.

### Run tests

```bash
./mvnw test
```

---

## 2. Frontend Setup

### Navigate to the frontend directory

```bash
cd enviro365-withdrawal-ui
```

### Configure the environment

Copy the example env file and adjust if needed:

```bash
cp .env.example .env
```

The default `.env` content:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Only change this if your backend runs on a different port or host.

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

---

## Demo Accounts

Two investor accounts are seeded automatically when the backend starts:

| Investor | Username | Password |
|---|---|---|
| John Smith (age 70) | `john.smith` | `John123!` |
| Mary Johnson (age 45) | `mary.johnson` | `Mary123!` |

To override the default passwords, set these environment variables **before** starting the backend:

```bash
export ENVIRO365_DEMO_JOHN_PASSWORD=YourPassword1!
export ENVIRO365_DEMO_MARY_PASSWORD=YourPassword2!
./mvnw spring-boot:run
```

---

## Available URLs

| URL | Description |
|---|---|
| `http://localhost:5173` | React frontend |
| `http://localhost:8080/api` | REST API base |
| `http://localhost:8080/swagger-ui/index.html` | API documentation (Swagger UI) |
| `http://localhost:8080/h2-console` | H2 database console |

### H2 Console connection details

```
JDBC URL:  jdbc:h2:mem:envirodb
Username:  sa
Password:  (leave blank)
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/auth/me` | Returns the authenticated user |
| `GET` | `/api/investors/me/portfolio` | Returns the authenticated investor's portfolio |
| `POST` | `/api/withdrawals` | Creates a withdrawal |
| `GET` | `/api/withdrawals` | Lists the investor's withdrawal history |
| `GET` | `/api/withdrawals/export` | Downloads withdrawal history as `withdrawals.csv` |

### Withdrawal request body

```json
{
  "productId": 1,
  "amount": 10000
}
```

---

## Business Rules

| Rule | Detail |
|---|---|
| Retirement age restriction | Withdrawals from retirement products are only allowed when the investor is older than 65 |
| Balance limit | Withdrawal amount cannot exceed the available product balance |
| Maximum withdrawal | Withdrawal amount cannot exceed 90% of the product balance |

---

## Authentication & Data Isolation

- All API routes require HTTP Basic authentication.
- Each investor only sees their own portfolio, withdrawals, and CSV export.
- The frontend holds credentials in memory only — refreshing the page requires signing in again. Nothing is written to `localStorage` or `sessionStorage`.
- Withdrawal creation verifies that the selected product belongs to the authenticated investor.

> **Security note:** HTTP Basic must only be used over HTTPS outside local development. The demo passwords are for local assessment/testing only. Replace them before any deployment.

---

## Author

Athule Gift — Enviro365 Junior Developer Assessment
