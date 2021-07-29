document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".calc3")) {
    const calc = document.querySelector(".event-calc__form"),
      inputList = document.querySelectorAll(".form-contacts__input");

    calc.addEventListener("change", (event) => {
      const target = event.target;

      inputList.forEach((item) => {
        if (item === target && !target.value) {
          target.closest(".form-contacts__group").classList.add("form-contacts__group-error");
        } else if (item === target && target.value) {
          target.closest(".form-contacts__group").classList.remove("form-contacts__group-error");
        }
      });
    });

    calc.addEventListener("submit", (event) => {
      inputList.forEach((item) => {
        if (!item.value) {
          event.preventDefault();

          item.closest(".form-contacts__group").classList.add("form-contacts__group-error");
        }
      });
    });
  }
});
