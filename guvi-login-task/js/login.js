function validate() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var errorMessage = "";

  if (email.trim() === "") {
    errorMessage += "Email is required.<br>";
    document.getElementById("email-error").innerHTML = "Email is required.";
  } else if (!emailPattern.test(email)) {
    errorMessage += "Invalid email format.<br>";
    document.getElementById("email-error").innerHTML = "Invalid email format.";
  } else {
    document.getElementById("email-error").innerHTML = "";
  }

  if (password.trim() === "") {
    errorMessage += "Password is required.<br>";
    document.getElementById("password-error").innerHTML = "Password is required.";
  } else {
    document.getElementById("password-error").innerHTML = "";
  }

  if (errorMessage === "") {
    authenticate(email, password);
  }
}
function authenticate(email, password) {
  $.ajax({
    url: "http://localhost:8000/guvi-login-task/php/login.php",
    method: "POST",
    data: {
      email:email,
      password:password
    },
    success: function (response) {
      if (response.status) {
        swal("😍!", "login Successfully", "success")
          .then(() => {
            localStorage.setItem("loggedIn","true");
            localStorage.setItem("email",email);
            localStorage.setItem("client-name",response.name);
            window.location.href = "profile.html";
          });
      } else {
        console.log(response.message);
        swal("sorry🙄!", response.message, "warning");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(textStatus, errorThrown);
    }
  });
}

