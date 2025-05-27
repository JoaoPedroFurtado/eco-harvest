
//Pega os dados pelo id do forms, fica de olho na acao submit que dispara, e o event.preventDefault, impede de enviar caso tenha erro;
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let isValid = true;
    
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    
    email.classList.remove("is-invalid");
    password.classList.remove("is-invalid");
    emailError.textContent = "";
    passwordError.textContent = "";
    
    if (!email.value) {
        emailError.textContent = "O e-mail é obrigatório.";
        email.classList.add("is-invalid");
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = "E-mail inválido.";
        email.classList.add("is-invalid");
        isValid = false;
    }
    
    if (!password.value) {
        passwordError.textContent = "A senha é obrigatória.";
        password.classList.add("is-invalid");
        isValid = false;
    } else if (password.value.length < 6) {
        passwordError.textContent = "A senha deve ter pelo menos 6 caracteres.";
        password.classList.add("is-invalid");
        isValid = false;
    }
    
    if (isValid) {
    window.location = "./index.html"
        
    }
});