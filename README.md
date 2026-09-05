# Student Course API

A RESTful backend API for managing users and courses, built with **Node.js, Express, and TypeScript**.

The project was developed incrementally to practice backend architecture, authentication and authorization, database persistence, automated testing, file uploads, validation, and API design.

Different branches preserve major stages of the project, including implementations using both **MySQL with Prisma** and **MongoDB with Mongoose**.

## Features

* User registration and login
* JWT-based authentication
* Role-based authorization
* `STUDENT`, `COACH`, and `ADMIN` roles
* User profile management
* Admin-only coach creation
* Course CRUD operations
* Course ownership authorization
* Course image uploads
* Request validation with Zod
* Password hashing with Argon2
* Centralized error handling
* Structured controller, service, and repository layers
* Relational database implementation with Prisma and MySQL
* Document database implementation with MongoDB and Mongoose
* API testing with Jest and Supertest

---

## Project Branches

This repository contains several branches representing different stages of the project.

| Branch                 | Purpose                                                                     |
| ---------------------- | --------------------------------------------------------------------------- |
| `main`                 | Default project branch and repository overview                              |
| `prisma-mysql`         | Persistent SQL implementation using MySQL and Prisma ORM                    |
| `mongodb-mongoose`     | MongoDB implementation using Mongoose, including later backend improvements |
| `jest-supertest-tests` | API testing implementation using Jest and Supertest                         |

The database branches represent alternative persistence implementations of the same Student Course API rather than databases that are intended to run together.

### `prisma-mysql`

Uses:

* MySQL
* Prisma ORM
* Prisma Client
* Prisma migrations and schema
* Relational `User` → `Course` relationships

### `mongodb-mongoose`

Uses:

* MongoDB
* Mongoose
* Mongoose models and schemas
* Document-based persistence
* Population of related documents
* Pagination
* Jest and Supertest testing work

### `jest-supertest-tests`

Focuses specifically on API testing with:

* Jest
* Supertest
* `ts-jest`

---

## Tech Stack

### Core

* Node.js
* TypeScript
* Express.js

### Authentication & Security

* JSON Web Tokens
* Argon2
* Role-based access control

### Validation & File Handling

* Zod
* Multer

### Databases

**Relational implementation**

* MySQL
* Prisma ORM

**Document implementation**

* MongoDB
* Mongoose

### Testing

* Jest
* Supertest

---

## Architecture

The application is organized by feature.

```text
src/
├── modules/
│   ├── auth/
│   ├── courses/
│   └── users/
│
├── shared/
│   ├── config/
│   ├── middlewares/
│   ├── utils/
│   └── genericRepo.ts
│
└── server.ts
```

Each feature is separated into responsibilities such as:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

### Routes

Define HTTP endpoints and attach middleware.

### Controllers

Handle HTTP requests and responses.

### Services

Contain application and business logic.

### Repositories

Abstract data-access operations from the rest of the application.

This separation allows the persistence layer to evolve without placing database logic directly inside controllers.

---

## Authentication

The API uses JWT-based authentication.

After login, the API returns a token that can be sent to protected endpoints using:

```http
Authorization: Bearer <token>
```

Passwords are hashed with **Argon2** before being stored.

---

## Roles and Authorization

The system supports three roles.

### Student

The default role assigned when a normal user registers.

### Coach

Can create courses and manage courses they are authorized to modify.

### Admin

Has elevated permissions, including the ability to create Coach accounts.

Authorization is performed at multiple levels:

```text
Request
   ↓
Authentication
   ↓
Role Check
   ↓
Resource Authorization
   ↓
Controller
```

For example, creating a course requires a `COACH` or `ADMIN` role.

Updating or deleting a course additionally checks whether the authenticated user is authorized to modify that course.

---

## API Base Path

```text
/api/v1
```

---

## API Endpoints

### Authentication

| Method | Endpoint                | Description             | Access |
| ------ | ----------------------- | ----------------------- | ------ |
| POST   | `/api/v1/auth/register` | Register a new user     | Public |
| POST   | `/api/v1/auth/login`    | Login and receive a JWT | Public |

### Users

| Method | Endpoint              | Description                       | Access        |
| ------ | --------------------- | --------------------------------- | ------------- |
| GET    | `/api/v1/users/me`    | Get the current user's profile    | Authenticated |
| PUT    | `/api/v1/users/me`    | Update the current user's profile | Authenticated |
| POST   | `/api/v1/users/coach` | Create a Coach account            | Admin         |

### Courses

| Method | Endpoint              | Description        | Access                   |
| ------ | --------------------- | ------------------ | ------------------------ |
| GET    | `/api/v1/courses`     | Get courses        | Public                   |
| GET    | `/api/v1/courses/:id` | Get a course by ID | Public                   |
| POST   | `/api/v1/courses`     | Create a course    | Coach / Admin            |
| PUT    | `/api/v1/courses/:id` | Update a course    | Authorized Coach / Admin |
| DELETE | `/api/v1/courses/:id` | Delete a course    | Authorized Coach / Admin |

Course creation and update endpoints support image uploads through `multipart/form-data`.

The image field is named:

```text
image
```

---

## Data Model

The core domain contains two main resources:

```text
User
 ├── id
 ├── name
 ├── email
 ├── password
 ├── role
 ├── createdAt
 └── updatedAt

Course
 ├── id
 ├── title
 ├── description
 ├── image
 ├── creator
 ├── createdAt
 └── updatedAt
```

A course belongs to the user who created it.

The supported roles are:

```text
ADMIN
STUDENT
COACH
```

---

## Entity Relationship Diagram

The Prisma/MySQL implementation models a one-to-many relationship:

```text
User 1 ─────────── * Course
```

One user can create multiple courses, while each course has one creator.



---

# Running the Project

Clone the repository:

```bash
git clone https://github.com/Masa23-03/StudentCourseAPI.git
cd StudentCourseAPI
```

The setup depends on which implementation you want to run.

---

## Prisma + MySQL Version

Switch to:

```bash
git checkout prisma-mysql
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=4000
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your-secret-key"
MAX_IMAGE_SIZE_MB=5
NODE_ENV=development
```

Generate Prisma Client:

```bash
npx prisma generate
```

Apply the database schema:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npm run seed
```

Start the development server:

```bash
npm run dev
```

---

## MongoDB + Mongoose Version

Switch to:

```bash
git checkout mongodb-mongoose
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=4000
MONGODB_URL="your-mongodb-connection-string"
JWT_SECRET="your-secret-key"
MAX_IMAGE_SIZE_MB=5
NODE_ENV=development
```

Seed the MongoDB database when needed:

```bash
npm run seed-mongoose
```

Start the development server:

```bash
npm run dev
```

---

## Testing Version

The project includes API integration tests using **Jest** and **Supertest**.

To inspect the dedicated testing task:

```bash
git checkout jest-supertest-tests
```

Install dependencies:

```bash
npm install
```

Run the tests:

```bash
npm test
```

Testing work was also carried forward into the MongoDB/Mongoose stage of the project.

---

## Validation

Incoming request data is validated using **Zod**.

Validation is performed before invalid data reaches the business or persistence layers.

---

## File Uploads

Course images are handled with **Multer**.

The upload configuration:

* accepts image files
* generates unique filenames
* limits the maximum file size using an environment variable
* stores uploaded course images on the server

The maximum size is configured with:

```env
MAX_IMAGE_SIZE_MB=5
```

---

## Error Handling

The API includes centralized error handling for application errors and invalid requests.

Unknown API routes return a `404` response instead of silently failing.

The application also uses shared response helpers to keep successful and error responses consistent across controllers.

---

## What This Project Demonstrates

This project was used to practice the progression of a backend application beyond basic CRUD operations.

It covers:

* REST API design
* Express routing and middleware
* TypeScript backend development
* modular project organization
* controller/service/repository separation
* authentication with JWT
* password hashing
* role-based authorization
* resource ownership authorization
* request validation
* image uploads
* relational database modeling
* Prisma ORM
* MySQL
* MongoDB
* Mongoose
* database abstraction
* pagination
* API integration testing
* Jest and Supertest
* Git branching and pull-request workflows

The separate persistence branches also demonstrate how the same application domain can be implemented using both relational and document-oriented database approaches.
