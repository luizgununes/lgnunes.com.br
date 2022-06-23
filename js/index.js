const toggle = document.querySelectorAll("#language-toggle")[0];
const pt = document.querySelectorAll(".pt");
const en = document.querySelectorAll(".en");
const buttons = document.querySelectorAll('.right-side-buttons')[0];

buttons.addEventListener("click", () => {
  if (toggle.checked == true) {
    alert('Dude, this button is fake.');
  } else {
    alert('Cara, esse botão é falso.');
  }
});

toggle.addEventListener("change", () => {
  if (toggle.checked == true) {
    pt.forEach((x) => {
      x.style.display = "none";
    });
    en.forEach((x) => {
      x.style.display = "block";
    });
  } else {
    pt.forEach((x) => {
      x.style.display = "block";
    });
    en.forEach((x) => {
      x.style.display = "none";
    });
  }
});
