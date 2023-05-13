$(document).ready(function() {
    $("#registration-form").submit(function(event) {
      event.preventDefault();
  
      // Get the form data
      const formData = new FormData($("#registration-form")[0]);
      const username = formData.get("username");
      const password = formData.get("password");
  
      // Make an AJAX request to fetch the existing credentials
      $.ajax({
        url: "credentials.json",
        dataType: "json",
        success: function(credentials) {
          // Check if the entered username already exists in the JSON file
          let found = false;
          $.each(credentials, function(index, user) {
            if (username === user.username.trim()) {
              found = true;
              return false; // Equivalent of 'break' in a $.each loop
            }
          });
  
          if (found) {
            alert("Username is already taken. Please choose a different username.");
          } else {
            // Add the new user to the credentials array
            credentials.push({ username: username, password: password });
  
            // Make an AJAX request to save the updated credentials
            $.ajax({
              url: "credentials.json",
              type: "PUT",
              data: JSON.stringify(credentials),
              contentType: "application/json",
              success: function() {
                alert("Registration successful. You can now log in with your credentials.");
                $("#registration-form")[0].reset();
              },
              error: function() {
                alert("Failed to save credentials. Please try again.");
              }
            });
          }
        },
        error: function() {
          alert("Failed to fetch existing credentials. Please try again.");
        }
      });
    });
  });
  