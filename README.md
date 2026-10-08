# Student Records API

A small Node.js and Express API for reading and deleting student records stored
in MongoDB. The project is a straightforward starting point for experimenting
with REST APIs, Express, and MongoDB.

## Features

- Connects to MongoDB when the application starts
- Lists all student records
- Deletes a student by its `studentId`
- Runs locally with Node.js or in a Docker container

## Requirements

- Node.js 22 or newer
- npm
- A MongoDB database and connection string

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set the MongoDB connection details. The application reads these values from
   environment variables:

   # Nimbus Terminal
   $env:MONGODB_URI = "mongodb://localhost:5050"
   $env:MONGODB_DATABASE = "students_db"
   ```

   `MONGODB_DATABASE` is optional and defaults to `db_455j2ngzu`. Never commit
   real database credentials or connection strings to the repository.

3. Start the API:

   ```bash
   npm start
   ```

   The server listens on port `5050` by default. Set `PORT` if you need a
   different port.

## API endpoints

### Get all students

```http
GET /students
```

```bash
curl http://localhost:5050/students
```

### Delete a student

```http
DELETE /students/:id
```

The `:id` value must match the student's `studentId`.

```bash
curl -X DELETE http://localhost:5050/students/STU-001
```

Successful responses return JSON. A missing student returns `404`, and
database or server errors return `500`.

## Docker

Build the image:

```bash
docker build -t student-records-api .
```

Run the container:

```bash
docker run --rm -p 5050:5050 `
  -e MONGODB_URI="mongodb://host.docker.internal:27017" `
  -e MONGODB_DATABASE="students_db" `
  student-records-api
```

On macOS or Linux, replace the backticks with backslashes.

## Project structure

```text
.
├── src/
│   ├── app.js           # Express application and MongoDB endpoints
│   ├── index.html       # Simple placeholder page
│   └── routes/
│       └── index.js     # Example in-memory routes
├── Dockerfile
├── package.json
└── package-lock.json
```

## Development notes

The `dev` script expects `nodemon` to be available in the project
environment. If you want automatic restarts while developing, install it as a
development dependency and then run:

```bash
npm install --save-dev nodemon
npm run dev
```
