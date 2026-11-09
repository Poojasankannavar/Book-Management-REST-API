# Book Management REST API

A beginner-friendly REST API built with Node.js and Express. It performs CRUD operations on an in-memory list of books. No database is required.

## Requirements
- Node.js and npm
- VS Code (recommended)
- Postman (for testing)

## 1. Open the project
Extract the ZIP file and open the `Book-Management-REST-API` folder in VS Code.

## 2. Install dependencies
Open the VS Code terminal (**Terminal → New Terminal**) and run:

```bash
npm install
```

## 3. Start the server

```bash
npm start
```

You should see:

```text
Book Management API is running at http://localhost:3000
```

Keep this terminal running while testing. Open `http://localhost:3000` in a browser to see the welcome message.

## API endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get one book by ID |
| POST | `/books` | Add a book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

### Example request bodies

For **POST** `http://localhost:3000/books`:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin"
}
```

For **PUT** `http://localhost:3000/books/1`:

```json
{
  "title": "The Alchemist - Updated",
  "author": "Paulo Coelho"
}
```

In Postman, choose **Body → raw → JSON** for POST and PUT requests.

## Test with Postman

A ready-to-import collection is included at `postman/Book-Management-API.postman_collection.json`.

1. Start the server using `npm start`.
2. Open Postman.
3. Select **Import** and choose the collection JSON file.
4. Run the requests. The collection includes GET, POST, PUT, and DELETE examples.

Run POST before PUT if you want to update a newly created book. The example requests use the initial sample book IDs where applicable.

## Important note about in-memory storage

Books are stored in a JavaScript array. Any books you add, update, or delete are lost when the server stops or restarts. This is expected for this task because a database is not required.

## HTTP status codes used
- `200 OK` – successful GET, PUT, or DELETE
- `201 Created` – book created
- `400 Bad Request` – missing or invalid title/author
- `404 Not Found` – book ID does not exist
- `500 Internal Server Error` – unexpected server error
