function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("client-name");
    localStorage.removeItem("email");
    window.location.href = "index.html";
}
function isLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";
}

if (!isLoggedIn()) {
    window.location.href = "index.html";
}

function validateForm() {
    var mobile = document.getElementById("mobile").value;
    var age = document.getElementById("age").value;
    var dob = document.getElementById("dob").value;

    var errorMessage = "";
    var mobilePattern = /^[1-9][0-9]{9}$/;
    var agePattern = /^[1-9][0-9]?$/;

    if (!mobilePattern.test(mobile)) {
        errorMessage += "Invalid mobile number format<br>";
        document.getElementById("mobile-error").innerHTML = "Invalid mobile number format";
    } else {
        document.getElementById("mobile-error").innerHTML = "";
    }

    if (!agePattern.test(age)) {
        errorMessage += "Age must be a valid number greater than 0.<br>";
        document.getElementById("age-error").innerHTML = "Age must be a valid number greater than 0.";
    } else {
        document.getElementById("age-error").innerHTML = "";
    }
    if (dob === "") {
        errorMessage += "Date of birth is required.<br>";
        document.getElementById("dob-error").innerHTML = "Date of birth is required.";
    } else {
        document.getElementById("dob-error").innerHTML = "";
    }

    if (errorMessage === "") {
        var name = localStorage.getItem("client-name");
        var email = localStorage.getItem("email");
        console.log(name + " " + mobile);
        insertIntoDb(email,name, dob, age, mobile);
    }
}

function insertIntoDb(email,name, dob, age, mobile) {
    $.ajax({
        url: "http://localhost:8000/guvi-login-task/php/profile.php",
        method: "POST",
        data: {
            email:email,
            name: name,
            dob: dob,
            age: age,
            mobileNumber: mobile
        },
        success: function (response) {
            if (response.status) {
                console.log(response);
                swal("😍!", "Updated Successfully", "success").then(function () {
                    document.getElementById("mobile").value = "";
                    document.getElementById("age").value = "";
                    document.getElementById("dob").value = "";
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