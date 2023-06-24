function validateForm() {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    var errorMessage = "";
    var firstnamePattern = /^[a-zA-Z\s]{2,}$/;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!firstnamePattern.test(firstname)) {
        errorMessage += "First name must contain at least 2 letters and spaces only.<br>";
        document.getElementById("firstname-error").innerHTML = "contain at least 2 letters and spaces only.";
    } else {
        document.getElementById("firstname-error").innerHTML = "";
    }

    if (!emailPattern.test(email)) {
        errorMessage += "Invalid email format.<br>";
        document.getElementById("email-error").innerHTML = "Invalid email format.";
    } else {
        document.getElementById("email-error").innerHTML = "";
    }

    if (!passwordPattern.test(password)) {
        errorMessage += "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.<br>";
        document.getElementById("password-error").innerHTML = "must be at least 8 characters<br>contain at least one uppercase,lowercase<br>one Number <br> one special character.";
    } else {
        document.getElementById("password-error").innerHTML = "";
    }


    if (confirmPassword !== password) {
        errorMessage += "Passwords do not match.<br>";
        document.getElementById("confirm-password-error").innerHTML = "Passwords do not match.";
    } else {
        document.getElementById("confirm-password-error").innerHTML = "";
    }
    if (errorMessage === "") {
        insertIntoDb(firstname, lastname, email, password);
    }
}

function insertIntoDb(firstname, lastname, email, password) {
    $.ajax({
        url: "http://localhost:8000/guvi-login-task/php/register.php",
        method: "POST",
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        },
        success: function (response) {
            if (response.status) {
                console.log(response);
                swal("😍!", "Registered Successfully", "success")
                    .then(() => {
                        window.location.href = "index.html";
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