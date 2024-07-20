// Défilement au clic sur le bouton "Débuter"
const myBtnScroll = document.getElementById("btn_debuter");
const myH2 = document.getElementById("monH2");

myBtnScroll.addEventListener("click", scrollDown);

function scrollDown() {
  // Fait défiler jusqu'à l'élément myH2 avec une animation fluide
  myH2.scrollIntoView({ behavior: "smooth" });
}

// Changement de couleur des montants de dons au clic
const tMontantsDon = document.querySelectorAll(".dons");

for (let cpt = 0; cpt < tMontantsDon.length; cpt++) {
  tMontantsDon[cpt].addEventListener("click", changerCouleur2);
}

function changerCouleur2(e) {
  // Désélectionne tous les montants de dons puis sélectionne celui cliqué
  const radios = document.querySelectorAll(".dons");
  for (let i = 0; i < radios.length; i++) {
    radios[i].classList.remove("checked");
  }
  e.currentTarget.classList.add("checked");
}

// Changement de couleur du type de don au clic
const tTypesDon = document.querySelectorAll(".type_dons");

for (let cpt = 0; cpt < tTypesDon.length; cpt++) {
  tTypesDon[cpt].addEventListener("click", changerCouleur);
}

function changerCouleur(e) {
  // Désélectionne tous les types de dons puis sélectionne celui cliqué
  const radios = document.querySelectorAll(".type_dons");
  for (let i = 0; i < radios.length; i++) {
    radios[i].classList.remove("checked");
  }
  e.currentTarget.classList.add("checked");
}

// Sélectionne un type de don par défaut
document.getElementById("donM").classList = "type_dons checked";

// Changement de couleur du type de paiement au clic
const tTypesPaiement = document.querySelectorAll(".type_paiement");

for (let cpt = 0; cpt < tTypesPaiement.length; cpt++) {
  tTypesPaiement[cpt].addEventListener("click", changerCouleurPaiement);
}

function changerCouleurPaiement(typePaiement) {
  // Désélectionne tous les types de paiement puis sélectionne celui cliqué
  const radios = document.querySelectorAll(".type_paiement");
  for (let i = 0; i < radios.length; i++) {
    radios[i].classList.remove("checked");
  }
  typePaiement.currentTarget.classList.add("checked");
}

// Validation du formulaire d'informations
const mesInputs = Array.from(document.querySelectorAll("input[type='button']"));
mesInputs[0].addEventListener("click", validerFormulaireInformation);

mesInputs[1].addEventListener("click", validerFormulaireDon);

const fields = [
  {
    id: "nom",
    errorId: "nomErreur",
    labelClass: "nom",
    regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s-']+$/,
  },
  {
    id: "prenom",
    errorId: "prenomErreur",
    labelClass: "prenom",
    regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s-']+$/,
  },
  {
    id: "identite",
    errorId: "identiteErreur",
    labelClass: "identite",
    regex: /^(homme|femme)$/i,
  },
  {
    id: "naissance",
    errorId: "naissanceErreur",
    labelClass: "naissance",
    regex: /^\d{4}-\d{2}-\d{2}$/,
  },
  {
    id: "province",
    errorId: "provinceErreur",
    labelClass: "province",
    regex: /^[A-Za-z\s-']+$/,
  },
  {
    id: "adresse",
    errorId: "adresseErreur",
    labelClass: "adresse",
    regex: /^[A-Za-z0-9\s-']+$/,
  },
];

// Importe les messages d'erreur depuis un fichier JSON

import data from './objJSONMessages.json' with { type: "json" };

function validerFormulaireInformation(e) {
  e.preventDefault();
  fields.forEach((field) => clearErrors(field));
  let erreur = false;

  const clickedButton = e.currentTarget;
  const buttonIndex = Array.from(mesInputs).indexOf(clickedButton);

  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    const errorSpan = document.getElementById(field.errorId);
    const label = document.querySelector(`.${field.labelClass}`);
    const value = input.value.trim();

    if (value === "") {
      erreur = true;
      errorSpan.innerHTML = data[field.id]["vide"];
      input.classList.add("input_erreur");
      label.classList.add("label_erreur");
    } else if (!field.regex.test(value)) {
      erreur = true;
      errorSpan.innerHTML = data[field.id]["pattern"];
      input.classList.add("input_erreur");
      label.classList.add("label_erreur");
    }
  });

  if (!erreur) {
    changerEtat(buttonIndex);
    document.querySelector(".container_formSection1").style.display = "none";
    document.querySelector(".container_formSection2").style.display = "block";
  }
}

// Validation du formulaire de don
function validerFormulaireDon() {
  const mesInputsRadio = Array.from(document.querySelectorAll(".dons"));
  let monChampErreurDonM = document.querySelector(".donErreurM");
  let monChampErreurDonU = document.querySelector(".donErreurU");
  let estValide = false;

  monChampErreurDonM.innerHTML = "";
  monChampErreurDonU.innerHTML = "";

  for (let i = 0; i < mesInputsRadio.length; i++) {
    if (mesInputsRadio[i].classList.contains("checked")) {
      estValide = true;
    }
  }

  if (estValide) {
    changerEtat(1);
    document.querySelector(".container_formSection2").style.display = "none";
    document.querySelector(".container_formSection3").style.display = "block";
    monChampErreurDonM.innerHTML = "";
    monChampErreurDonU.innerHTML = "";
  }

  if (!estValide) {
    if (document.getElementById("donM").classList.contains("checked")) {
      monChampErreurDonM.innerHTML = data["montantDonM"]["vide"];
      monChampErreurDonU.innerHTML = "";
    } else if (document.getElementById("donU").classList.contains("checked")) {
      monChampErreurDonU.innerHTML = data["montantDonU"]["vide"];
      monChampErreurDonM.innerHTML = "";
    }
  }
}

function clearErrors(field) {
  const input = document.getElementById(field.id);
  const errorSpan = document.getElementById(field.errorId);
  const label = document.querySelector(`.${field.labelClass}`);

  input.classList.remove("input_erreur");
  label.classList.remove("label_erreur");
  errorSpan.innerHTML = "";
}

// Passage à l'étape suivante du formulaire
function changerEtat(indexInput) {
  myH2.scrollIntoView({ behavior: "smooth" });
  let current_fs, next_fs; //fieldsets
  let opacity;
  let animating;

  current_fs = $("fieldset:visible");
  next_fs = $("fieldset").eq(indexInput + 1);

  $("#progressbar li")
    .eq(indexInput + 1)
    .addClass("active");

  // Affiche le prochain fieldset
  next_fs.show();

  // Cache le fieldset actuel avec une animation
  current_fs.animate(
    { opacity: 0 },
    {
      step: function (now) {
        opacity = 1 - now;
        next_fs.css({ opacity: opacity });
      },
      duration: 1,
      complete: function () {
        current_fs.hide();
        animating = false;
      },
    }
  );
}

// Validation du formulaire de paiement
const monSubmit = document.querySelector("input[type='submit']");

const champsCarteCredit = [
  {
    input: "nomTitulaire",
    erreur: "nomTitulaireErreur",
    label: "nomTitulaire",
    regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s-']+$/,
  },
  {
    input: "numeroCarte",
    erreur: "numeroCarteErreur",
    label: "numeroCarte",
    regex: /^\d{16}$/,
  },
  {
    input: "dateCarte",
    erreur: "dateCarteErreur",
    label: "dateCarte",
    regex: /^(0[1-9]|1[0-2])\/\d{2}$/,
  },
  {
    input: "cvcCarte",
    erreur: "cvcErreur",
    label: "cvcCarte",
    regex: /^\d{3}$/,
  },
];

const champsCompteBancaire = [
  { input: "typeCompte", erreur: "typeCompteErreur", label: "typeCompte" },
  {
    input: "numeroCompte",
    erreur: "numeroCompteErreur",
    label: "numeroCompte",
    regex: /^\d{10}$/,
  },
  {
    input: "numeroTransit",
    erreur: "numeroTransitErreur",
    label: "numeroTransit",
    regex: /^\d{5}$/,
  },
];

monSubmit.addEventListener("click", () => {
  if (document.getElementById("paiementCredit").checked) {
    validerFormulaireCarteCredit();
  }

  if (document.getElementById("paiementBanque").checked) {
    validerFormulaireCompteBancaire();
  }
});

document.getElementById("paiementCredit").addEventListener("click", () => {
  reinitialiserChamps(champsCompteBancaire);
});

document.getElementById("paiementBanque").addEventListener("click", () => {
  reinitialiserChamps(champsCarteCredit);
});

function validerFormulaireCarteCredit() {
  let estActif;

  for (const champ of champsCarteCredit) {
    const input = document.getElementById(champ.input);
    const champErreur = document.getElementById(champ.erreur);
    const label = document.querySelector(`.${champ.label}`);
    const valeur = input.value.trim();

    if (valeur === "") {
      estActif = false;
      champErreur.innerHTML = data[champ.input]["vide"];
      input.classList.add("input_erreur");
      label.classList.add("label_erreur");
    } else if (!champ.regex.test(valeur)) {
      estActif = false;
      if (data[champ.input]["pattern"]) {
        champErreur.innerHTML = data[champ.input]["pattern"];
      }
      input.classList.add("input_erreur");
      label.classList.add("label_erreur");
    } else {
      estActif = true;
      champErreur.innerHTML = "";
      input.classList.remove("input_erreur");
      label.classList.remove("label_erreur");
    }
  }
  if (estActif) {
    window.location.href = "confirmation.html";
  }
}

function validerFormulaireCompteBancaire() {
  let estActif2;

  for (const champ of champsCompteBancaire) {
    const input = document.getElementById(champ.input);
    const champErreur = document.getElementById(champ.erreur);
    const label = document.querySelector(`.${champ.label}`);
    const valeur = input.value.trim();

    if (valeur === "") {
      estActif2 = false;
      champErreur.innerHTML = data[champ.input]["vide"];
      input.classList.add("input_erreur");
      label.classList.add("label_erreur");
    } else if (champ.regex && !champ.regex.test(valeur)) {
      estActif2 = false;
      if (data[champ.input]["pattern"]) {
        champErreur.innerHTML = data[champ.input]["pattern"];
      }
      input.classList.add("input_erreur");
      label.classList.add("label_erreur");
    } else {
      estActif2 = true;
      champErreur.innerHTML = "";
      input.classList.remove("input_erreur");
      label.classList.remove("label_erreur");
    }
  }
  if (estActif2) {
    window.location.href = "confirmation.html";
  }
}

// Réinitialisation des champs de formulaire
function reinitialiserChamps(champs) {
  for (const champ of champs) {
    const input = document.getElementById(champ.input);
    const champErreur = document.getElementById(champ.erreur);
    const label = document.querySelector(`.${champ.label}`);

    input.value = "";
    champErreur.innerHTML = "";
    input.classList.remove("input_erreur");
    label.classList.remove("label_erreur");
  }
}

// Changement du type de don (mensuel ou unique) au clic
const donMensuelRadio = document.getElementById("donMensuel");
const donUniqueRadio = document.getElementById("donUnique");
const containerDonMensuel = document.querySelector(".container_donMensuel");
const containerDonUnique = document.querySelector(".container_donUnique");

donMensuelRadio.addEventListener("click", () => {
  containerDonMensuel.style.display = "block";
  containerDonUnique.style.display = "none";
});

donUniqueRadio.addEventListener("click", () => {
  containerDonMensuel.style.display = "none";
  containerDonUnique.style.display = "block";
});

containerDonMensuel.style.display = "block";
containerDonUnique.style.display = "none";

// Changement du type de paiement (carte de crédit ou compte bancaire) au clic
const paiementCreditRadio = document.getElementById("paiementCredit");
const paiementBanqueRadio = document.getElementById("paiementBanque");
const containerPaiementCredit = document.querySelector(
  ".container_paiementCredit"
);
const containerPaiementBanque = document.querySelector(
  ".container_paiementBanque"
);

paiementCreditRadio.addEventListener("click", () => {
  containerPaiementCredit.style.display = "block";
  containerPaiementBanque.style.display = "none";
});

paiementBanqueRadio.addEventListener("click", () => {
  containerPaiementCredit.style.display = "none";
  containerPaiementBanque.style.display = "block";
});

containerPaiementCredit.style.display = "block";
containerPaiementBanque.style.display = "none";
document.getElementById("paiementC").classList = "type_paiement checked";
