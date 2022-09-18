let registrationform = document.getElementById('registration');

registrationform.addEventListener('submit', function (event) {

    event.preventDefault();

    let errors = {};
    let form = event.target


    let username = document.getElementById("username").value;
    if (username.length < 5 || username == "") {
        errors.usernameValue = 'Username must be at least 6 characters and can not be empty!'

    };

    let email = document.getElementById('email').value
    let emailvalidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (email.match(emailvalidation)) {
        email = true;
    } else {
        errors.email = 'Please enter valid email adress'
    }


    let password1 = document.getElementById('password1').value;
    let password2 = document.getElementById('password2').value;

    if (password1 != password2) {
        errors.password = 'Passwords do no match'
    };

    let agree = document.getElementById('agree').checked;
    if (agree == false) {
        errors.agree = 'You must agree our conditions!'
    };

    let gender = false;
    registrationform.querySelectorAll('[name = "gender"]').forEach(item => {
        if (item.checked) {
            gender = true;
        }
    })
    if (!gender) {
        errors.gender = 'Select your gender!'
    }
    console.log(errors);

    form.querySelectorAll(".error-text").forEach(element => {
        element.innerHTML = '';
    });

    for (let item in errors) {
        console.log(item);

        let TextError = document.getElementById("error_" + item);

        if (TextError) {
            TextError.textContent = errors[item];
        }
    }

    if (Object.keys(errors).length == 0) {
        form.submit();
    }
});

let passwordShow = document.getElementById("password1");
let icon = document.getElementById("eye-icon");

icon.addEventListener("click", function () {
    if (passwordShow.type == "password") {
        passwordShow.setAttribute("type", "text");
        icon.classList.add("fa-eye");
    }
    else {
        icon.classList.remove("fa-eye");
        icon.classList.add('fa-eye-slash')
        passwordShow.setAttribute("type", "password");
    }
});


document.getElementById('login').addEventListener('submit', function (event) {
    event.preventDefault();

    let checkbox = document.getElementById('savelogin');
    if (checkbox.checked) {
        let saveemail = document.getElementById('saveemail').value;
        Cookies.set('saveinfo', saveemail)
    } else {
        Cookies.remove('saveinfo')
    }
    event.target.submit();
});
