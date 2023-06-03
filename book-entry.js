$(document).ready(function() {
  // Book entry form submission
  $('#bookEntryForm').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form values
    var bookTitle = $('#title').val();
    var authorName = $('#author').val();
    var genre = $('#genre').val();
    var publicationYear = $('#publicationYear').val();
    var totalPage = $('#totalPages').val();
    var status = $('#status').val();
    var rating = $('input[name="rating"]:checked').val();

    // Validate the form data
    if (!bookTitle || !authorName || !genre || !publicationYear || !totalPage || !status || !rating) {
      alert('Please fill in all the fields');
      return;
    }

    // Create a book object with a unique ID
    var book = {
      id: generateUniqueId(), // Generate a unique ID for the book
      title: bookTitle,
      author: authorName,
      genre: genre,
      publicationYear: publicationYear,
      totalPages: totalPage,
      status: status,
      rating: rating
    };

    // Get the existing books from local storage
    var existingBooks = localStorage.getItem('books');
    var books = existingBooks ? JSON.parse(existingBooks) : [];
    books.push(book); // Add the new book to the existing books array

    // Save the updated books array to local storage
    localStorage.setItem('books', JSON.stringify(books));

    alert('Book entry saved successfully!'); // Display a success message
    $('#bookEntryForm')[0].reset(); // Reset the form
  });

  // Function to generate a unique ID for a book
  function generateUniqueId() {
    // Generate a random number and convert it to a base36 string
    return Math.random().toString(36).substr(2, 9);
  }
});
