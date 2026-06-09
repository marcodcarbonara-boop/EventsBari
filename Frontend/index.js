const password = document.getElementById("password");
const showPasswordBtn = document.getElementById("showPasswordBtn");

showPasswordBtn.addEventListener("click", () => {
    const icon = showPasswordBtn.querySelector("i, svg");
    if(password.type === "password") {
        password.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
        console.log(icon);
    } else {
        password.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
                console.log(icon);

    }
});