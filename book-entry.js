$(document).ready(function() {
    // Book entry form submission
    $('form').submit(function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get the form values
      var title = $('#title').val();
      var author = $('#author').val();
      var genre = $('#genre').val();
      var publicationYear = $('#publicationYear').val();
      var totalPages = $('#totalPages').val();
      var status = $('#status').val();
      var rating = $('input[name="rating"]:checked').val();
  
      // Validate the form data
      if (!title && !author && !genre && !publicationYear && !totalPages && !status && !rating) {
        alert('Please fill in all the fields');
        return;
      }
  
      // Create a book object with a unique ID
      var book = {
        id: generateUniqueId(), // Generate a unique ID for the book
        title: title,
        author: author,
        genre: genre,
        publicationYear: publicationYear,
        totalPages: totalPages,
        status: status,
        rating: rating
      };
  
      // Get the existing books from local storage
      var existingBooks = localStorage.getItem('books');
      var books = existingBooks ? JSON.parse(existingBooks) : [];
      books.push(book); // Add the new book to the existing books array
  
      // Save the updated books array to local storage
      localStorage.setItem('books', JSON.stringify(books));
  
      // Convert the book data to a Blob object
      var jsonData = JSON.stringify(books);
      var blob = new Blob([jsonData], { type: 'application/json' });
  
      // Create a temporary link element to download the file
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'books.json';
  
      // Trigger the download by simulating a click event
      link.click();
  
      alert('Book entry saved successfully!'); // Display a success message
      $('form')[0].reset(); // Reset the form
    });
  
    // Function to generate a unique ID for a book
    function generateUniqueId() {
      // Generate a random number and convert it to a base36 string
      return Math.random().toString(36).substr(2, 9);
    }
  });
  