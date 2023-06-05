$(document).ready(function () {
  // Retrieve books from local storage
  var books = localStorage.getItem('books');
  if (books) {
    books = JSON.parse(books);
    displayBookList(books, 1); // Display the first page initially
  }

  var pageSize = 2; // Number of data rows to display per page

  // Function to handle multiple book deletion
  function handleMultipleDelete() {
    var selectedBooks = $('.book-checkbox:checked');
    if (selectedBooks.length === 0) {
      alert('Please select at least one book to delete.');
      return;
    }

    var confirmation = confirm('Are you sure you want to delete the selected books?');
    if (confirmation) {
      var idsToDelete = selectedBooks.map(function () {
        return $(this).closest('tr').data('book-id');
      }).get();

      // Filter out the selected books from the array
      var filteredBooks = books.filter(function (book) {
        return !idsToDelete.includes(book.id);
      });

      // Update the local storage
      localStorage.setItem('books', JSON.stringify(filteredBooks));

      // Re-display the book list, passing the current page number
      displayBookList(filteredBooks, getCurrentPageNumber());
    }
  }

  // Function to display the book list with pagination
  function displayBookList(books, currentPage) {
    var tableBody = $('#bookListTable');
    tableBody.empty(); // Clear the table body

    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    var currentBooks = books.slice(startIndex, endIndex);

    currentBooks.forEach(function (book) {
      var row = $('<tr>');

      // Create a checkbox for each book
      var checkboxCell = $('<td>');
      var checkbox = $('<input>').attr('type', 'checkbox').addClass('book-checkbox');
      checkboxCell.append(checkbox);

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
      updateButton.click(function () {
        // Redirect to update-book.html and pass the book ID as a parameter
        window.location.href = 'update-book.html?id=' + book.id;
      });

      // Add event listener to the delete button
      deleteButton.click(function () {
        // Confirm deletion with the user
        var confirmation = confirm('Are you sure you want to delete the selected book(s)?');
        if (confirmation) {
          // Get all selected checkboxes
          var checkboxes = $('.book-checkbox:checked');

          // Get the IDs of selected books
          var selectedBookIds = checkboxes.map(function () {
            return $(this).closest('tr').data('book-id');
          }).get();

          // Filter the books array to keep only the books with IDs not in selectedBookIds
          var filteredBooks = books.filter(function (book) {
            return !selectedBookIds.includes(book.id);
          });

          // Update the local storage
          localStorage.setItem('books', JSON.stringify(filteredBooks));

          // Re-display the book list, passing the current page number
          displayBookList(filteredBooks, getCurrentPageNumber());
        }
      });

      // Append buttons to the actions cell
      actionsCell.append(updateButton, deleteButton);

      // Store the book ID as a data attribute on the table row
      row.data('book-id', book.id);

      // Append all cells to the table row
      row.append(
        checkboxCell,
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

    // Generate pagination links
    generatePaginationLinks(books.length, currentPage);
  }

  // Function to generate pagination links
  function generatePaginationLinks(totalRows, currentPage) {
    var totalPages = Math.ceil(totalRows / pageSize);
    var paginationContainer = $('#paginationContainer');
    paginationContainer.empty(); // Clear the pagination container
  
    var paginationHTML = '<div class="pagination-link">';
  
    // Add the first page link
    paginationHTML += '<a href="#" data-page="1">1</a>';
  
    var startPage, endPage;
  
    if (totalPages <= 6) {
      // If there are 6 or fewer pages, display all page links except the first and last
      startPage = 2;
      endPage = totalPages - 1;
    } else {
      // Otherwise, display a subset of page links based on the current page
      if (currentPage <= 3) {
        startPage = 2;
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
        endPage = totalPages - 1;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
  
      // Add the dots before the first or last page link
      if (currentPage <= 3) {
        paginationHTML += '<span>...</span>';
      } else if (currentPage >= totalPages - 2) {
        paginationHTML += '<span>...</span>';
      } else {
        paginationHTML += '<span>...</span>';
        paginationHTML += '<a href="#" data-page="' + (totalPages - 1) + '">' + (totalPages - 1) + '</a>';
      }
    }
  
    // Add the page number links
    for (var i = startPage; i <= endPage; i++) {
      if (i === currentPage) {
        paginationHTML += '<span class="pagination-link active">' + i + '</span>';
      } else {
        paginationHTML += '<a href="#" data-page="' + i + '">' + i + '</a>';
      }
    }
  
    // Add the dots after the first or last page link
    if (currentPage <= 3) {
      paginationHTML += '<a href="#" data-page="' + totalPages + '">' + totalPages + '</a>';
      paginationHTML += '<span>...</span>';
    } else if (currentPage >= totalPages - 2) {
      paginationHTML += '<span>...</span>';
      paginationHTML += '<a href="#" data-page="2">2</a>';
    } else {
      paginationHTML += '<span>...</span>';
    }
  
    // Add the last page link
    paginationHTML += '<a href="#" data-page="' + totalPages + '">' + totalPages + '</a>';
  
    paginationHTML += '</div>';
    paginationContainer.html(paginationHTML);
  
    // Add event listeners to the pagination links
    paginationContainer.find('a').click(function (event) {
      event.preventDefault();
      var page = parseInt($(this).data('page'));
      displayBookList(books, page);
    });
  }

  // Function to get the current page number from the active page link
  function getCurrentPageNumber() {
    var currentPageLink = $('#paginationContainer .active');
    return parseInt(currentPageLink.text());
  }

  $('#searchButton').click(function () {
    var searchTitle = $('#searchTitleInput').val().toLowerCase();
    var searchAuthor = $('#searchAuthorInput').val().toLowerCase();
    var searchGenre = $('#searchGenreInput').val().toLowerCase();
    var searchStatus = $('#searchStatusInput').val().toLowerCase();
    var searchRating = $('#searchRatingInput').val().toLowerCase();

    var filteredBooks = books.filter(function (book) {
      var titleMatch = book.title.toLowerCase().includes(searchTitle);
      var authorMatch = book.author.toLowerCase().includes(searchAuthor);
      var genreMatch = book.genre.toLowerCase().includes(searchGenre);
      var statusMatch = book.status.toLowerCase().includes(searchStatus);
      var ratingMatch = book.rating.toLowerCase().includes(searchRating);

      return titleMatch && authorMatch && genreMatch && statusMatch && ratingMatch;
    });

    // Update the book list with the filtered books and display the first page
    displayBookList(filteredBooks, 1);
  });

  $('#multipleDeleteButton').click(function () {
    handleMultipleDelete();
  });
});
