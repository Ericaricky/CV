document.addEventListener("DOMContentLoaded", () => {
    const cvCards = document.querySelectorAll(".cv-example");
  
    cvCards.forEach(card => {
      // Au survol, on applique un léger zoom
      card.addEventListener("mouseover", () => {
        card.style.transform = "scale(1.02)";
        card.style.transition = "transform 0.3s ease";
      });
      card.addEventListener("mouseout", () => {
        card.style.transform = "scale(1)";
      });
  
      // Au clic, on peut ajouter une bordure pour signaler la sélection
      card.addEventListener("click", () => {
        cvCards.forEach(c => c.style.border = "none");
        card.style.border = "3px solid #007bff";
      });
    });
  });
  console.log("Compte enregistré dans localStorage :", localStorage.getItem("userAccount"));
console.log("Données saisies :", enteredEmail, enteredPassword);
// function onclik pour rediriger
function rediriger(){
    window.location.href = "generator.html";
}