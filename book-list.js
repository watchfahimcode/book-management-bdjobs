$(document).ready(function () {
  // Retrieve books from local storage
  var books = localStorage.getItem('books');
  if (books) {
    books = JSON.parse(books);
    displayBookList(books);
  }

  var pageSize = 3; // Number of data rows to display per page

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

      // Re-display the book list
      displayBookList(filteredBooks);
    }
  }

  // Function to display the book list
  function displayBookList(books) {
    var tableBody = $('#bookListTable');
    tableBody.empty(); // Clear the table body

    books.forEach(function (book) {
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

          // Re-display the book list
          displayBookList(filteredBooks);
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

    // Generate and display the pagination buttons
    generatePaginationButtons(books.length);
  }

  // Generate and display the pagination buttons
  function generatePaginationButtons(totalItems) {
    var totalPages = Math.ceil(totalItems / pageSize);
    var paginationContainer = $('#paginationContainer');
    paginationContainer.empty(); // Clear the pagination container

    // Create the "First" button
    var firstButton = $('<button>').text('First').addClass('btn btn-primary btn-sm');
    firstButton.attr('id', 'firstPageButton');
    paginationContainer.append(firstButton);

    // Create the "Previous" button
    var previousButton = $('<button>').text('Previous').addClass('btn btn-primary btn-sm mr-2');
    previousButton.attr('id', 'previousPageButton');
    paginationContainer.append(previousButton);

    // Calculate the range of pages to display
    var startPage, endPage;
    if (totalPages <= 3) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
    }

    // Create pagination buttons for the range of pages
    for (var i = startPage; i <= endPage; i++) {
      var pageButton = $('<button>').text(i).addClass('btn btn-primary btn-sm');
      if (i === currentPage) {
        pageButton.addClass('active');
      }
      paginationContainer.append(pageButton);
    }

    // Create the "Next" button
    var nextButton = $('<button>').text('Next').addClass('btn btn-primary btn-sm mr-2');
    nextButton.attr('id', 'nextPageButton');
    paginationContainer.append(nextButton);

    // Create the "Last" button
    var lastButton = $('<button>').text('Last').addClass('btn btn-primary btn-sm');
    lastButton.attr('id', 'lastPageButton');
    paginationContainer.append(lastButton);
  }

  // Function to display the book list page for a specific page
  function displayBookListPage(books, currentPage, pageSize) {
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    var pagedBooks = books.slice(startIndex, endIndex);

    displayBookList(pagedBooks);
  }

  // Get the total number of pages
  var totalPages = Math.ceil(books.length / pageSize);
  var currentPage = 1;

  // Display the initial book list page
  displayBookListPage(books, currentPage, pageSize);

  // Generate the initial pagination buttons
  generatePaginationButtons(books.length);

  // Pagination button click event handlers
  $('#paginationContainer').on('click', 'button', function () {
    var buttonId = $(this).attr('id');

    switch (buttonId) {
      case 'firstPageButton':
        currentPage = 1;
        break;
      case 'previousPageButton':
        if (currentPage > 1) {
          currentPage--;
        }
        break;
      case 'nextPageButton':
        if (currentPage < totalPages) {
          currentPage++;
        }
        break;
      case 'lastPageButton':
        currentPage = totalPages;
        break;
      default:
        currentPage = parseInt(buttonId);
    }

    // Display the selected page
    displayBookListPage(books, currentPage, pageSize);

    // Generate the updated pagination buttons
    generatePaginationButtons(books.length);

    // Scroll to the top of the book list table
    $('html, body').animate({
      scrollTop: $('#bookListTable').offset().top
    }, 'fast');
  });

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

    // Reset the current page to 1
    currentPage = 1;

    // Display the filtered book list page
    displayBookListPage(filteredBooks, currentPage, pageSize);

    // Generate the updated pagination buttons
    generatePaginationButtons(filteredBooks.length);

    // Scroll to the top of the book list table
    $('html, body').animate({
      scrollTop: $('#bookListTable').offset().top
    }, 'fast');
  });

  $('#multipleDeleteButton').click(function () {
    handleMultipleDelete();
  });
});
