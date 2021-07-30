document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".calc3")) {
    const calc = document.querySelector(".event-calc__form"),
      totalSpan = document.querySelector(".form-total__text-final"),
      es_field_1 = document.querySelector('input[name="es_field_1"]'),
      es_field_2 = document.querySelector('input[name="es_field_2"]'),
      es_field_2_1 = document.querySelector('select[name="es_field_2-1"]'),
      es_field_3 = document.querySelector('select[name="es_field_3"]'),
      es_field_4 = document.querySelector('input[name="es_field_4"]'),
      es_field_4_1 = document.querySelector('select[name="es_field_4-1"]'),
      es_field_5 = document.querySelector('input[name="es_field_5"]'),
      es_field_6 = document.querySelector('input[name="es_field_6"]'),
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

    let es1val = 0,
      es2val = 0,
      es3val = es_field_3.value, // Принимает значение 1, 2 или 3. От этого зависят расчеты некоторых других величин
      es4val = 0,
      es5val = 0,
      es6val = 0,
      es21val = 0,
      es7val = 0,
      es8val = 0,
      es9val = 0,
      es10val = 0,
      es11val = 0,
      es12val = 0,
      es13val = 0,
      es14val = 0,
      es15val = 0,
      es16val = 0,
      es17val = 0,
      es18val = 0,
      es19val = 0,
      es20val = 0;

    // Проверяет, отмечен ли чекбокс
    function isChecked(item) {
      if (item.checked) {
        return item.dataset.price;
      } else {
        return 0;
      }
    }

    // Высчитывает стоимость конкретной услуги
    function calcValues() {
      es1val = isChecked(es_field_1);
      es2val = es_field_2.dataset.price * es_field_2_1.value;
      es3val = es_field_3.value;
      es4val = es_field_4.dataset.price * es_field_4_1.value;
      es21val = isChecked(es_field_21) * es_field_21_1.value;
      es7val = isChecked(es_field_7) * es_field_7_1.value;
      es8val = isChecked(es_field_8);
      es10val = isChecked(es_field_10);
      es12val = isChecked(es_field_12) * es_field_12_1.value;
      es17val = isChecked(es_field_17);
      es18val = isChecked(es_field_18);

      // Зависят от длительности ролика (es3val)
      if (es3val === "1") {
        es5val = es_field_5.dataset.price * 1;
        es6val = es_field_6.dataset.price * 1;
        es9val = isChecked(es_field_9) * 1;
        es11val = es_field_11.dataset.price * 1;
        es13val = isChecked(es_field_13) * 1;
        es14val = es_field_14.dataset.price * 1;
        es15val = es_field_15.dataset.price * 1;
        es16val = isChecked(es_field_16) * 1;
        es19val = es_field_19.dataset.price * 1;
        es20val = es_field_20.dataset.price * 1;
      } else if (es3val === "2") {
        es5val = es_field_5.dataset.price * 1.25;
        es6val = Math.ceil(es_field_6.dataset.price * 1.33333);
        es9val = isChecked(es_field_9) * 1.2;
        es11val = es_field_11.dataset.price * 1.5;
        es13val = Math.ceil(isChecked(es_field_13) * 1.16666);
        es14val = es_field_14.dataset.price * 1.5;
        es15val = es_field_15.dataset.price * 1.5;
        es16val = isChecked(es_field_16) * 1.6;
        es19val = Math.ceil(es_field_19.dataset.price * 1.33333);
        es20val = es_field_20.dataset.price * 1.25;
      } else if (es3val === "3") {
        es5val = es_field_5.dataset.price * 1.75;
        es6val = Math.ceil(es_field_6.dataset.price * 1.6666666666);
        es9val = isChecked(es_field_9) * 1.4;
        es11val = es_field_11.dataset.price * 1.8;
        es13val = Math.ceil(isChecked(es_field_13) * 2.16666);
        es14val = es_field_14.dataset.price * 2.25;
        es15val = es_field_15.dataset.price * 2;
        es16val = isChecked(es_field_16) * 3.6;
        es19val = Math.ceil(es_field_19.dataset.price * 1.66666);
        es20val = es_field_20.dataset.price * 1.5;
      }
    }

    // Высчитывает общую сумму
    function calcTotal() {
      calcValues();

      total =
        +es1val +
        +es2val +
        +es4val +
        +es5val +
        +es6val +
        +es21val +
        +es7val +
        +es8val +
        +es9val +
        +es10val +
        +es11val +
        +es12val +
        +es13val +
        +es14val +
        +es15val +
        +es16val +
        +es17val +
        +es18val +
        +es19val +
        +es20val;

      createTotalText();
    }

    // Выводит общую сумму, разделенную точками
    function createTotalText() {
      let totalString = total.toString(),
        totalArray = [];

      while (totalString.length > 3) {
        totalArray.push(totalString.slice(-3));
        totalString = totalString.slice(0, -3);
      }

      totalArray.push(totalString);

      totalText = "";

      for (let i = totalArray.length; i > 0; i--) {
        totalText += totalArray[i - 1];

        if (i !== 1) {
          totalText += ".";
        }
      }

      totalSpan.textContent = `${totalText} `;
    }

    calc.addEventListener("change", () => {
      calcTotal();
    });

    calcTotal();
  }
});
