const express = require("express");
const app = express();

let books = [
  {
    id: "b1",
    title: "Book One",
    description: "Description of book one",
    authorId: "a1",
  },
  {
    id: "b2",
    title: "Book Two",
    description: "Description of book two",
    authorId: "a2",
  },
];

let reviews = [
  { id: "r1", text: "Amazing book!", bookId: "b1" },
  { id: "r2", text: "Decent read.", bookId: "b2" },
];

let authors = [
  { id: "a1", name: "Author One", bio: "Bio of Author One" },
  { id: "a2", name: "Author Two", bio: "Bio of Author Two" },
];

// Your routing and controller code goes here
app.get("/", (req, res) => {
  res.send("Welcome to the bookstore!");
});

app.get("/books", (req, res) => {
  res.send(books);
});

app.get("/books/:book_id", (req, res) => {
  // Retrieve the value of the placeholder ":book_id" when the server loads with that URL
  const book_id = req.params.book_id;
  // Find a matching book ID to that placeholder
  const selectedBook = books.find((book) => book.id === book_id);
  // Find the matching author of the book based on the author ID in selectedBook
  const selectedAuthor = authors.find(
    (author) => author.id === selectedBook.authorId
  );
  // Create a new array to store the merged selection
  const mergedSelection = {
    ...selectedBook, // Contents of the selected book
    // Anonymous function, where the "()," at the end immediately invokes the function
    ...(() => {
      const { id, ...rest } = selectedAuthor; // Destructuring the selectedAuthor object
      return rest; // Returning everything except the id of selectedAuthor
    })(),
  };
  res.send(mergedSelection);
});

app.get("/reviews", (req, res) => {
  res.send(reviews);
});

app.get("/reviews/:review_id", (req, res) => {
  // Retrieve the value of the placeholder ":review_id" when the server loads with that URL
  const review_id = req.params.review_id;
  // Find a matching review ID to that placeholder
  const selectedReview = reviews.find((review) => review.id === review_id);
  // Find the matching book of the review based on the bookID in selectedReview
  const selectedBook = books.find((book) => book.id === selectedReview.bookId);
  // Create a new array to store the merged selection
  const mergedSelection = {
    ...selectedReview, // Contents of the selected review
    book_title: selectedBook.title, // Adding only the selected book's title to the object at the end
  };
  res.send(mergedSelection);
});

app.get("/authors", (req, res) => {
  res.send(authors);
});

app.get("/authors/:author_id", (req, res) => {
  const author_id = req.params.author_id;
  const selectedAuthor = authors.find((author) => author.id === author_id);
  res.send(selectedAuthor);
});

app.listen(5555, () => {
  console.log("Bookstore app is running on port 5555, http://localhost:5555");
});
