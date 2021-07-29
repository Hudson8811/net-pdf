document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".calc3")) {
    const calc = document.querySelector(".event-calc__form"),
      totalSpan = document.querySelector(".form-total__text-final"),
      es_field_1 = document.querySelector('input[name="es_field_1"]'),
      es_field_2 = document.querySelector('input[name="es_field_2"]'),
      es_field_2_1 = document.querySelector('select[name="es_field_2-1"]'),
      es_field_3 = document.querySelector('select[name="es_field_3"]'),
      es_field_4 = document.querySelector('select[name="es_field_4"]'),
      es_field_5 = document.querySelector('select[name="es_field_5"]'),
      es_field_6 = document.querySelector('select[name="es_field_6"]'),
      es_field_21 = document.querySelector('input[name="es_field_21"]'),
      es_field_21_1 = document.querySelector('select[name="es_field_21-1"]'),
      es_field_7 = document.querySelector('input[name="es_field_7"]'),
      es_field_7_1 = document.querySelector('select[name="es_field_7-1"]'),
      es_field_8 = document.querySelector('input[name="es_field_8"]'),
      es_field_9 = document.querySelector('input[name="es_field_9"]'),
      es_field_10 = document.querySelector('input[name="es_field_10"]'),
      es_field_11 = document.querySelector('input[name="es_field_11"]'),
      es_field_12 = document.querySelector('input[name="es_field_12"]'),
      es_field_12_1 = document.querySelector('select[name="es_field_12-1"]'),
      es_field_13 = document.querySelector('input[name="es_field_13"]'),
      es_field_14 = document.querySelector('input[name="es_field_14"]'),
      es_field_15 = document.querySelector('input[name="es_field_15"]'),
      es_field_16 = document.querySelector('input[name="es_field_16"]'),
      es_field_17 = document.querySelector('input[name="es_field_17"]'),
      es_field_18 = document.querySelector('input[name="es_field_18"]'),
      es_field_19 = document.querySelector('input[name="es_field_19"]'),
      es_field_20 = document.querySelector('input[name="es_field_20"]');

    let total = 0,
      totalText = "";

    const calcTotal = () => {
      total = +es_field_1.dataset.price;

      createTotalText();
    };

    const createTotalText = () => {
      let totalString = total.toString(),
        totalArray = [];

      while (totalString.length > 3) {
        totalArray.push(totalString.slice(-3));
        totalString = totalString.slice(0, -3);
      }

      totalArray.push(totalString);

      for (let i = totalArray.length; i > 0; i--) {
        totalText += totalArray[i - 1];

        if (i !== 1) {
          totalText += ".";
        }
      }
    };

    calcTotal();
    totalSpan.textContent = `${totalText} `;
  }
});
