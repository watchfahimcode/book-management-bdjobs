// update-book.js

// Get book ID from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');

// Get book data from local storage
const books = JSON.parse(localStorage.getItem('books'));

// Find the book with the matching ID
const book = books.find((book) => book.id === bookId);

// Populate form fields with book data
document.getElementById('title').value = book.title;
document.getElementById('author').value = book.author;
document.getElementById('genre').value = book.genre;
document.getElementById('publicationYear').value = book.publicationYear;
document.getElementById('totalPages').value = book.totalPages;
document.getElementById('status').value = book.status;
document.getElementById('rating').value = book.rating;

// Update book data in local storage upon form submission
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();

  // Update book values
  book.title = document.getElementById('title').value;
  book.author = document.getElementById('author').value;
  book.genre = document.getElementById('genre').value;
  book.publicationYear = document.getElementById('publicationYear').value;
  book.totalPages = document.getElementById('totalPages').value;
  book.status = document.getElementById('status').value // Convert to lowercase
  book.rating = document.getElementById('rating').value // Convert to lowercase

  // Convert the first letter to uppercase for status and rating
  book.status = book.status.charAt(0).toUpperCase() + book.status.slice(1);
  book.rating = book.rating.charAt(0).toUpperCase() + book.rating.slice(1);

  // Update the book in the books array
  const updatedBooks = books.map((b) => (b.id === bookId ? book : b));

  // Update the books array in local storage
  localStorage.setItem('books', JSON.stringify(updatedBooks));

  // Redirect to book-list.html
  window.location.href = 'book-list.html';
});
