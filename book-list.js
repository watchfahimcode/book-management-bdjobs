$(document).ready(function() {
    // Retrieve books from local storage
    var books = localStorage.getItem('books');
    if (books) {
        books = JSON.parse(books);
        displayBookList(books);
    }

    // Function to display the book list
    function displayBookList(books) {
        var tableBody = $('#bookListTable');
        tableBody.empty(); // Clear the table body

        books.forEach(function(book) {
            var row = $('<tr>');

            // Create table cells for each book property
            var titleCell = $('<td>').text(book.title);
            var authorCell = $('<td>').text(book.author);
            var genreCell = $('<td>').text(book.genre);
            var yearCell = $('<td>').text(book.publicationYear);
            var pagesCell = $('<td>').text(book.totalPages);
            var statusCell = $('<td>').text(book.status);
            var ratingCell = $('<td>').text(book.rating);
            var actionsCell = $('<td>');

            // Create update and delete buttons
            var updateButton = $('<button>').text('Update').addClass('btn btn-primary btn-sm mr-2');
            var deleteButton = $('<button>').text('Delete').addClass('btn btn-danger btn-sm');

            // Add event listeners to the buttons
            updateButton.click(function() {
                // Handle update functionality
                alert('Update button clicked for book with ID: ' + book.id);
            });

            deleteButton.click(function() {
                // Handle delete functionality
                alert('Delete button clicked for book with ID: ' + book.id);
            });

            // Append buttons to the actions cell
            actionsCell.append(updateButton, deleteButton);

            // Append all cells to the table row
            row.append(
                titleCell,
                authorCell,
                genreCell,
                yearCell,
                pagesCell,
                statusCell,
                ratingCell,
                actionsCell
            );

            // Append the row to the table body
            tableBody.append(row);
        });
    }
});
