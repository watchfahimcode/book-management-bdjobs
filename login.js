$(document).ready(function() {
    // Login form submission
    $('#loginForm').submit(function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get the form values
      var username = $('#username').val();
      var password = $('#password').val();
  
      // Validate the form data
      if (!username || !password) {
        alert('Please fill in all the fields');
        return;
      }
  
      // Fetch the users from the users.json file
      fetch('users.json')
        .then(function(response) {
          if (!response.ok) {
            throw new Error('An error occurred while fetching the user data.');
          }
          return response.json();
        })
        .then(function(users) {
          // Find the user with matching username and password
          var user = users.find(function(user) {
            return user.username === username && user.password === password;
          });
  
          if (user) {
            // Successful login
            alert('Login successful!');
            // Redirect to index.html
            window.location.href = 'index.html';
          } else {
            // Invalid credentials
            alert('Invalid username or password');
          }
  
          $('form')[0].reset(); // Reset the form
        })
        .catch(function(error) {
          alert(error.message);
        });
    });
  });
  