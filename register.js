/* register.js */
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    let userAccount = { email, password };
    localStorage.setItem("userAccount", JSON.stringify(userAccount));

    alert("Compte créé avec succès !");
    window.location.href = "index.html";
});