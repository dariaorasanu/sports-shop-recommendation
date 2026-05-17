# SportMatch - Sports Shop Recommendation

SportMatch is a web application that recommends sports activities and suitable sports equipment based on a user's lifestyle, preferences, goals, budget and fitness level.

The project combines a React frontend, a Spring Boot backend and a PostgreSQL database. The main business logic is implemented at database level using PL/pgSQL functions, procedures, triggers, constraints and views.

## Main idea

The user creates an account and completes a lifestyle questionnaire. Based on the answers, the system calculates a compatibility score between the user profile and each available sport.

After the recommendations are generated, the user can view suitable products for the recommended sport and place orders directly from the application.

## Features

- user registration and login
- lifestyle questionnaire completion
- automatic user level calculation
- sports recommendation based on compatibility score
- product filtering based on sport, level, budget and stock
- order placement
- order history
- order confirmation and cancellation
- database-side procedures and functions
- triggers for automated operations
- views for simplified data access
- exception handling between PostgreSQL, backend and frontend

## Tech stack

### Backend

- Java 21
- Spring Boot
- Spring JDBC / JdbcTemplate
- REST API
- No ORM used

### Database

- PostgreSQL
- PL/pgSQL
- SQL scripts
- functions
- procedures
- triggers
- views
- constraints

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

## Project structure

```text
PROJECT/
├── backend/
│   └── Spring Boot application
│
├── frontend/
│   └── React + Vite application
│
├── database/
│   ├── 01_create_tables.sql
│   ├── 02_insert_data.sql
│   ├── 03_functions_procedures.sql
│   ├── 04_triggers.sql
│   └── 05_views.sql
│
└── README.md
```
## Database overview

The database contains **8 main tables**:

- `utilizatori` - stores user account data
- `chestionare` - stores questionnaire answers
- `sporturi` - stores the sports catalog
- `recomandari` - stores generated sport recommendations
- `categorii_produse` - stores product categories
- `produse` - stores available products
- `comenzi` - stores order headers
- `detalii_comanda` - stores ordered products and quantities

The schema uses primary keys, foreign keys, unique constraints, check constraints, default values, and not null constraints in order to keep the data valid and consistent.


## PL/pgSQL logic

The project is not limited to simple CRUD operations. Important logic is implemented directly in PostgreSQL.

## Recommendation logic

The recommendation system is based on two main functions:

- `calculeaza_nivel_utilizator`
- `calculeaza_scor_sport`

The compatibility score is calculated using multiple criteria:

- preferred environment
- preferred activity type
- user objective
- effort tolerance
- available free time

Only sports with a compatibility score greater than or equal to `60` are saved as recommendations.

## Order logic

The `plaseaza_comanda` procedure handles order placement. It validates:

- the ordered quantity
- the existence of the user
- the existence of the product
- the available stock

If the stock is not sufficient or the input data is invalid, the procedure raises an exception. The backend catches this exception and sends a clear error message to the frontend.

## Triggers

The project uses triggers for automated database operations:

- setting the registration date automatically for new users
- recalculating the order total when order details are inserted, updated, or deleted

This keeps important values consistent at database level without duplicating the logic in the application code.

## Views

The database contains views used by the backend to simplify queries:

- `view_recomandari_utilizatori`
- `view_produse_disponibile`
- `view_comenzi_utilizatori`

These views combine data from multiple tables and make the Java code easier to read and maintain.

## Backend

The backend follows a simple layered structure:

`Controller -> Service -> Repository`

Controllers expose REST endpoints, services coordinate the application flow, and repositories communicate directly with the database using `JdbcTemplate`.

The backend does not use Hibernate, JPA, or any other ORM. SQL statements and calls to PL/pgSQL procedures are written explicitly.

## Example

```text
The backend calls the database procedure:

CALL plaseaza_comanda(id_utilizator, id_produs, cantitate, adresa_livrare)
```
Database exceptions are handled using a global exception handler. This allows PL/pgSQL errors, such as insufficient stock or invalid IDs, to be returned to the frontend as readable messages.



## Frontend

The frontend is implemented in React and provides pages for:

- authentication
- questionnaire completion
- generated recommendations
- product display and order placement
- order history
- sports catalog

The frontend communicates with the backend through HTTP requests defined in `api.js`.

## Main application flow

```text
User registers or logs in
        ↓
User completes the questionnaire
        ↓
Backend saves the questionnaire
        ↓
Backend calls the PL/pgSQL recommendation procedure
        ↓
Database calculates and stores the recommendations
        ↓
Frontend displays the recommended sports
        ↓
User views products and places an order
        ↓
Database validates stock, creates the order and updates totals
```


```md
## Running the project
```
### 1. Create and populate the database

Run the SQL scripts from the `database/` folder in order:

- `01_create_tables.sql`
- `02_insert_data.sql`
- `03_functions_procedures.sql`
- `04_triggers.sql`
- `05_views.sql`

### 2. Start the backend

Open the `backend/` folder and run the Spring Boot application.

```bash
./mvnw spring-boot:run
```
On Windows:
```bash
mvnw spring-boot:run
```

### 3. Start the frontend

Open the `frontend/` folder and install dependencies:

```bash
npm install
```
```bash
npm run dev
```

## Notes

This project was developed for the Database Management Systems course. The focus of the project is the integration between a web application and a relational database, with important business logic implemented directly in PostgreSQL through PL/pgSQL.









