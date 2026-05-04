# Sports Shop Recommendation

Sports Shop Recommendation is a web application for recommending sports activities and suitable sports equipment based on a user's lifestyle, preferences, goals, budget, and fitness level.

The project combines a Spring Boot backend with a PostgreSQL database. The main recommendation logic will be implemented at database level using PL/pgSQL functions, procedures, triggers, constraints, and views.

## Main idea

The user completes a lifestyle questionnaire. Based on the answers, the system calculates a compatibility score between the user profile and the available sports. After recommending one or more sports, the system suggests suitable products depending on the recommended sport, the user's level, budget, and available stock.

## Planned features

- user management
- lifestyle questionnaire completion
- sports recommendation based on compatibility score
- product recommendation based on sport, level, budget, and stock
- order placement
- order details and history
- database-side procedures and functions
- triggers for automated operations
- exception handling between database and application

## Tech stack

- Java 21
- Spring Boot
- PostgreSQL
- PL/pgSQL
- JDBC / JdbcTemplate
- Thymeleaf or a simple web interface
- HTML / CSS

## Project structure

```text
PROJECT/
├── backend/
│   └── Spring Boot application
├── database/
│   └── SQL scripts for tables, data, functions, procedures, triggers and views
└── README.md
```