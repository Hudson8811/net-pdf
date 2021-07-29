document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".calc3")) {
    const calc = document.querySelector(".event-calc__form");

    const requiredCheckboxes = document.querySelectorAll(".js-required-checkbox");

    calc.addEventListener("change", (event) => {
      const target = event.target;

      requiredCheckboxes.forEach((item) => {
        if (item === target) {
          item.checked = "checked";
          item.closest("label").classList.add("form-checkbox__error");
          item.closest(".form-calc__item").classList.add("form-calc__item-error");
        }
      });
    });
  }
});
