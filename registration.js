$(document).ready(function() {
  // Registration form submission
  $('form').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form values
    var fullname = $('#fullname').val();
    var username = $('#username').val();
    var phone = $('#phone').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var confirmPassword = $('#confirmPassword').val();

    // Validate the form data
    if (!fullname || !username || !phone || !email || !password || !confirmPassword) {
      alert('Please fill in all the fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Create a user object
    var user = {
      fullname: fullname,
      username: username,
      phone: phone,
      email: email,
      password: password
    };

    // Get the existing users from local storage
    var existingUsers = localStorage.getItem('users');
    var users = existingUsers ? JSON.parse(existingUsers) : [];
    users.push(user); // Add the new user to the existing user array

    // Save the updated user array to local storage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!'); // Display a success message
    window.location.href = "login.html";
  });

  
  
});
