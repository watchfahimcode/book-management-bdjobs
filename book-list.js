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
                // Redirect to update-book.html and pass the book ID as a parameter
                window.location.href = 'update-book.html?id=' + book.id;
            });

            deleteButton.click(function() {
                // Confirm deletion with the user
                var confirmation = confirm('Are you sure you want to delete this book?');
                if (confirmation) {
                    // Find the index of the book in the array
                    var index = books.findIndex(function(item) {
                        return item.id === book.id;
                    });
            
                    if (index !== -1) {
                        // Remove the book from the array
                        books.splice(index, 1);
                        
                        // Update the local storage
                        localStorage.setItem('books', JSON.stringify(books));
                        
                        // Re-display the book list
                        displayBookList(books);
                    }
                }
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

    $('#searchButton').click(function() {
        var searchTitle = $('#searchTitleInput').val().toLowerCase();
        var searchAuthor = $('#searchAuthorInput').val().toLowerCase();
        var searchGenre = $('#searchGenreInput').val().toLowerCase();
        var searchStatus = $('#searchStatusInput').val().toLowerCase();
        var searchRating = $('#searchRatingInput').val().toLowerCase();

        var filteredBooks = books.filter(function(book) {
            var titleMatch = book.title.toLowerCase().includes(searchTitle);
            var authorMatch = book.author.toLowerCase().includes(searchAuthor);
            var genreMatch = book.genre.toLowerCase().includes(searchGenre);
            var statusMatch = book.status.toLowerCase().includes(searchStatus);
            var ratingMatch = book.rating.toLowerCase().includes(searchRating);

            return titleMatch && authorMatch && genreMatch && statusMatch && ratingMatch;
        });

        displayBookList(filteredBooks);
    });
});