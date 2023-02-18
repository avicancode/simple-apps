const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

form.addEventListener("submit", (e) => {
    console.log("Event Listner");
    console.log(e);
    e.preventDefault();

    validateInputs();
});

function onFocusOut(e) {
    const value = username.value;
    if ((value === "") | (value.length < 5)) {
        setError(username, "Username must be at least of 5 characters.");
    } else {
        setSuccess(username);
    }
}
username.onfocusout = function (e) {
    onFocusOut(e);
};

const setError = (element, message) => {
    console.log("Setting Error: ", message);
    console.log(element);
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    // Clear error message and set status as success
    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2value = password2.value.trim();

    if (usernameValue === "") {
        setError(username, "Username is required");
    } else {
        setSuccess(username);
    }

    if (emailValue === "") {
        setError(email, "Email Id is required");
    } else if (!isValidEmail(emailValue)) {
        setError(email, "Provide a valid email address");
    } else {
        setSuccess(email);
    }

    if (passwordValue === "") {
        setError(password, "Password is required");
    } else if (passwordValue.lenght < 8) {
        setError(password, "Password must be at least 8 characters.");
    } else {
        setSuccess(password);
    }

    if (password2Value === "") {
        setError(password2, "Please confirm your password");
    } else if (password2Value !== passwordValue) {
        setError(password2, "Password doesn't match.");
    } else {
        setSuccess(password2);
    }
};
