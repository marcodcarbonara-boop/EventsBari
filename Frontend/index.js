const password = document.getElementById("password");
const showPasswordBtn = document.getElementById("showPasswordBtn");

showPasswordBtn.addEventListener("click", () => {
    const icon = showPasswordBtn.querySelector("i, svg");
    if(password.type === "password") {
        password.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        password.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
});

// Gestione secondo occhio (Conferma Password - Solo in singup.html)
const passwordConfirm = document.getElementById("passwordConfirm");
const showPasswordConfirmBtn = document.getElementById("showPasswordConfirmBtn");

showPasswordConfirmBtn.addEventListener("click", () => {
    const icon = showPasswordConfirmBtn.querySelector("i, svg");
    if(password.type === "password") {
        password.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        password.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
});