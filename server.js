const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON request bodies.
app.use(express.json());

// In-memory book collection (data resets when the server restarts).
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Wings of Fire", author: "A. P. J. Abdul Kalam" }
];

let nextId = 3;

// Welcome route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Book Management REST API" });
});

// GET /books - return all books
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

// GET /books/:id - return one book
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((item) => item.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(book);
});

// POST /books - add a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (typeof title !== "string" || !title.trim() ||
      typeof author !== "string" || !author.trim()) {
    return res.status(400).json({
      message: "Both title and author are required as non-empty strings"
    });
  }

  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim()
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - update an existing book
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((item) => item.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const { title, author } = req.body;

  if (typeof title !== "string" || !title.trim() ||
      typeof author !== "string" || !author.trim()) {
    return res.status(400).json({
      message: "Both title and author are required as non-empty strings"
    });
  }

  book.title = title.trim();
  book.author = author.trim();

  res.status(200).json(book);
});

// DELETE /books/:id - delete a book
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(index, 1)[0];
  res.status(200).json({
    message: "Book deleted successfully",
    book: deletedBook
  });
});

// Handle invalid JSON and other errors.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON request body" });
  }

  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Book Management API is running at http://localhost:${PORT}`);
});
