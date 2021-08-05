document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".calc4")) {
    const calc = document.querySelector(".event-calc__form");

    calc.addEventListener("mouseover", (event) => {
      const target = event.target;

      if (target.classList.contains("tooltip")) {
        target.closest(".form-calc__item").querySelector(".tooltiptext").style.visibility = "visible";
      }
    });

    calc.addEventListener("mouseout", (event) => {
      const target = event.target;

      if (target.classList.contains("tooltip")) {
        target.closest(".form-calc__item").querySelector(".tooltiptext").style.visibility = "hidden";
      }
    });
  }
});
