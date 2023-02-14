console.log("Loading script");
var x = document.getElementById("login");
console.log(typeof x);
console.log(x);
var y = document.getElementById("register");
var z = document.getElementById("btn");

function register() {
    x.style.left = "-100px";
    y.style.left = "50px";
    z.style.left = "110px";
    // x.style.display = "none";
    // y.style.display = "block";
}
function login() {
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
    // y.style.display = "none";
    // x.style.display = "block";
}
var modal = document.getElementById("login-form");
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"; // Hide login/register form
    }
};
