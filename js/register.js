(function () {
    'use strict';
    window.addEventListener('load', function () {
        var forms = document.getElementsByClassName('needs-validation');
        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './assets/animation/Animation - 1721198875708.json'
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const gender = document.getElementById('gender').value;

    if (!validateEmail(email)) {
        showToast('Invalid email format.', 3000, 'error-toast');
        return;
    }

    if (!validatePassword(password)) {
        showToast('Password must be at least 6 characters long and contain at least one uppercase letter, one special character, and one number.', 3000, 'error-toast');
        return;
    }

    if (!validateName(name)) {
        showToast('Name must contain only letters.', 3000, 'error-toast');
        return;
    }

    if (!validatePhone(phone)) {
        showToast('Phone number must be exactly 10 digits.', 3000, 'error-toast');
        return;
    }

    if (!validateGender(gender)) {
        showToast('Please select a valid gender.', 3000, 'error-toast');
        return;
    }


    const data = {
        email: email,
        password: password,
        name: name,
        gender: gender === 'true',
        phone: phone
    };

    fetch('https://shop.cyberlearn.vn/api/Users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.statusCode === 200) {
            showToast('Registration successful!', 3000, 'success-toast');
            setTimeout(function() {
                window.location.href = '/index.html'; 
            }, 3000);
        } else {
            showToast('Registration failed: ' + data.message, 3000, 'error-toast');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('An error occurred. Please try again later.', 3000, 'error-toast');
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    const re = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$/;
    return re.test(password);
}

function validateName(name) {
    const re = /^[a-zA-Z\s]+$/;
    return re.test(name);
}

function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
}

function validateGender(gender) {
    return gender === 'true' || gender === 'false';
}


function showToast(text, duration, className) {
    Toastify({
        text: text,
        duration: duration,
        close: true,
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: className === 'success-toast' ? 'green' : 'red',
        },
        onClick: function(){} // Callback after click
    }).showToast();
}