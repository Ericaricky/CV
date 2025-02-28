document.addEventListener("DOMContentLoaded", () => {
    // Références aux champs du formulaire
    const fullNameInput = document.getElementById("fullName");
    const ageInput = document.getElementById("age");
    const sexInput = document.getElementById("sex");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const jobTitleInput = document.getElementById("jobTitle");
    const situationInput = document.getElementById("situation");
    const summaryInput = document.getElementById("summary");
    const educationInput = document.getElementById("education");
    const skillsInput = document.getElementById("skills");
    const hobbiesInput = document.getElementById("hobbies");
    const languagesInput = document.getElementById("languages");
    
    // Références à la section expériences (unique, pouvant contenir plusieurs blocs)
    const experienceSection = document.getElementById("experienceSection");
    
    // Références aux éléments de prévisualisation
    const previewName = document.getElementById("previewName");
    const previewJobTitle = document.getElementById("previewJobTitle");
    const previewPhone = document.getElementById("previewPhone");
    const previewEmail = document.getElementById("previewEmail");
    const previewLanguages = document.getElementById("previewLanguages");
    const previewHobbies = document.getElementById("previewHobbies");
    const previewSummary = document.getElementById("previewSummary");
    const previewEducation = document.getElementById("previewEducation");
    const previewSkills = document.getElementById("previewSkills");
    const previewExperiences = document.getElementById("previewExperiences");
  
    // Fonction pour mettre à jour la prévisualisation des informations principales
    function updateMainPreview() {
      previewName.textContent = fullNameInput.value || "Nom Prénom";
      previewJobTitle.textContent = jobTitleInput.value || "Titre du poste";
      previewPhone.textContent = phoneInput.value || "Téléphone";
      previewEmail.textContent = emailInput.value || "Email";
      previewLanguages.textContent = languagesInput.value || "Langues";
      previewHobbies.textContent = hobbiesInput.value || "Hobbies";
      previewSummary.textContent = summaryInput.value || "Résumé de votre profil...";
      previewEducation.textContent = educationInput.value || "Formation, diplômes...";
      previewSkills.textContent = skillsInput.value || "Compétences...";
    }
  
    // Fonction pour mettre à jour la prévisualisation des expériences
    function updateExperiencesPreview() {
      // Récupérer tous les blocs d'expérience et construire le contenu
      const expBlocks = experienceSection.querySelectorAll(".experience-block");
      if(expBlocks.length === 0) {
        previewExperiences.innerHTML = "<p>Aucune expérience renseignée.</p>";
        return;
      }
      previewExperiences.innerHTML = "";
      expBlocks.forEach((block, index) => {
        const company = block.querySelector(".companyName").value || "Entreprise";
        const position = block.querySelector(".position").value || "Poste";
        const startDate = block.querySelector(".startDate").value || "Début";
        const endDate = block.querySelector(".endDate").value || "Fin";
        const description = block.querySelector(".missionDescription").value || "Description";
        const expDiv = document.createElement("div");
        expDiv.classList.add("mb-2");
        expDiv.innerHTML = `<p><strong>${company}</strong> - ${position} (${startDate} - ${endDate})<br>${description}</p>`;
        previewExperiences.appendChild(expDiv);
      });
    }
  
    // Fonction globale de mise à jour de la prévisualisation
    function updatePreview() {
      updateMainPreview();
      updateExperiencesPreview();
    }
  
    // Attacher l'événement "input" sur tous les champs principaux
    const mainFields = document.querySelectorAll("#cvForm input:not(.companyName):not(.position):not(.startDate):not(.endDate), #cvForm textarea:not(.missionDescription), #cvForm select");
    mainFields.forEach(field => {
      field.addEventListener("input", updatePreview);
    });
  
    // Attacher l'événement "input" aux champs d'expérience déjà existants
    function attachExperienceListeners(expBlock) {
      const inputs = expBlock.querySelectorAll("input, textarea");
      inputs.forEach(input => {
        input.addEventListener("input", updatePreview);
      });
    }
    // Attacher aux blocs d'expérience déjà présents
    const initialExpBlocks = experienceSection.querySelectorAll(".experience-block");
    initialExpBlocks.forEach(block => attachExperienceListeners(block));
  
    // Bouton pour ajouter une nouvelle expérience
    const addExperienceBtn = document.getElementById("addExperienceBtn");
    addExperienceBtn.addEventListener("click", () => {
      // Créer un nouveau bloc d'expérience
      const newExpBlock = document.createElement("div");
      newExpBlock.classList.add("experience-block", "mb-3");
      newExpBlock.innerHTML = `
        <div class="mb-2">
          <label class="form-label">Nom de l'entreprise</label>
          <input type="text" class="form-control companyName" placeholder="Entreprise">
        </div>
        <div class="mb-2">
          <label class="form-label">Poste occupé</label>
          <input type="text" class="form-control position" placeholder="Poste">
        </div>
        <div class="mb-2">
          <label class="form-label">Date de début</label>
          <input type="text" class="form-control startDate" placeholder="Ex : 2018">
        </div>
        <div class="mb-2">
          <label class="form-label">Date de fin</label>
          <input type="text" class="form-control endDate" placeholder="Ex : 2020">
        </div>
        <div class="mb-2">
          <label class="form-label">Description de mission</label>
          <textarea class="form-control missionDescription" rows="2" placeholder="Description"></textarea>\n      </div>\n    `;
      experienceSection.appendChild(newExpBlock);
      attachExperienceListeners(newExpBlock);
      updatePreview();
      // Faire défiler la page vers le nouveau bloc ajouté
      newExpBlock.scrollIntoView({ behavior: "smooth" });
    });
  
    // Mise à jour initiale
    updatePreview();
  
    // Sauvegarde du CV dans le localStorage lors de la soumission
    const cvForm = document.getElementById("cvForm");
    cvForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cvData = {
        fullName: fullNameInput.value,
        age: ageInput.value,
        sex: sexInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        jobTitle: jobTitleInput.value,
        situation: situationInput.value,
        summary: summaryInput.value,
        education: educationInput.value,
        skills: skillsInput.value,
        hobbies: hobbiesInput.value,
        languages: languagesInput.value,
        experiences: [] // Rassembler les expériences dans un tableau
      };
      const expBlocks = experienceSection.querySelectorAll(".experience-block");
      expBlocks.forEach(block => {
        cvData.experiences.push({
          company: block.querySelector(".companyName").value,
          position: block.querySelector(".position").value,
          startDate: block.querySelector(".startDate").value,
          endDate: block.querySelector(".endDate").value,
          description: block.querySelector(".missionDescription").value
        });
      });
      localStorage.setItem("cvData", JSON.stringify(cvData));
      alert("CV sauvegardé !");
    });
  });
  
    document.getElementById("fileInput").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const previewImage = document.getElementById("previewImage");
                previewImage.src = e.target.result;

                // Affiche le conteneur de prévisualisation
                document.getElementById("previewContainer").classList.remove("d-none");
            };

            reader.readAsDataURL(file);
        }
    });

    document.getElementById("downloadBtn").addEventListener("click", function() {
        const image = document.getElementById("previewImage").src;
        const link = document.createElement("a");
        link.href = image;
        link.download = "image_telechargee.png";
        link.click();
    });
    document.getElementById("fileInput").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
    
            reader.onload = function(e) {
                const previewImage = document.getElementById("previewImage");
                previewImage.src = e.target.result;
    
                // Affiche le conteneur de prévisualisation
                document.getElementById("previewContainer").classList.remove("d-none");
            };
    
            reader.readAsDataURL(file);
        }
    });
    
    document.getElementById("downloadBtn").addEventListener("click", function() {
        const image = document.getElementById("previewImage").src;
        const link = document.createElement("a");
        link.href = image;
        link.download = "image_telechargee.png";
        link.click();
    });
    document.getElementById("downloadCVBtn").addEventListener("click", () => {
        html2canvas(document.getElementById("cvPreview")).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const { jsPDF } = window.jspdf; // Récupération de jsPDF
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = 190; // Largeur utilisable avec marges (A4 = 210 mm - 10 mm de marge de chaque côté)
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Conserver le ratio de l'image
          pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
          pdf.save("CV.pdf");
        }).catch(error => {
          console.error("Erreur lors de la génération du PDF :", error);
        });
      });
      
      