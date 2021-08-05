document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".calc4")) {
    // Получение глобальныъ элементов
    const switcher = document.querySelector(".event-calc__buttons"),
      form = document.querySelector(".event-calc__form"),
      formType = document.getElementById("hidden"),
      dailySumText = document.getElementById("dailySum"),
      finalSumText = document.getElementById("finalSum");

    // Тип калькулятора. По-умолчанию — фото с людьми
    // + Общая сумма в день
    // + Общая сумма
    let calcType = false,
      dailyTotal = 0,
      total = 0;

    // Общие для обоих калькуляторов поля
    const es_field_3 = document.querySelector('select[name="es_field_3"]'),
      es3text = es_field_3.closest(".form-calc__item").querySelector(".form-calc__price"),
      es_field_4 = document.querySelector('select[name="es_field_4"]'),
      es4text = es_field_4.closest(".form-calc__item").querySelector(".form-calc__price"),
      es_field_9 = document.querySelector('select[name="es_field_9"]'),
      es9text = es_field_9.closest(".form-calc__item").querySelector(".form-calc__price"),
      productionPrice = document.getElementById("production-price"),
      es_field_13 = document.getElementById("es_field_13"),
      es13text = es_field_13.closest(".form-calc__item").querySelector(".form-calc__price"),
      es_field_14 = document.querySelector('select[name="es_field_14"]'),
      es14text = es_field_14.closest(".form-calc__item").querySelector(".form-calc__price");

    let es3val = 0,
      es4val = 0,
      es9val = 0,
      productionVal = 0,
      es13val = 0,
      es14val = 0;

    // Поля для калькулятора съемки с людьми
    const es_field_1 = document.getElementById("es_field_1"),
      es_field_2 = document.querySelector('select[name="es_field_2"]'),
      es2text = es_field_2.closest(".form-calc__item").querySelector(".form-calc__price"),
      es_field_5 = document.querySelector('select[name="es_field_5"]'),
      es5text = es_field_5.closest(".form-calc__item").querySelector(".form-calc__price"),
      es_field_6 = document.getElementById("es_field_6"),
      es6text = es_field_6.closest(".form-calc__item").querySelector(".form-calc__price"),
      es_field_7 = document.getElementById("es_field_7"),
      es7text = es_field_7.closest(".form-calc__item").querySelector(".form-calc__price"),
      es_field_8 = document.getElementById("es_field_8"),
      es8text = es_field_8.closest(".form-calc__item").querySelector(".form-calc__price"),
      makeupPrice = document.getElementById("makeup-price"),
      castingPrice = document.getElementById("casting-price");

    let es1val = 0,
      es2val = 0,
      es5val = 0,
      es6val = 0,
      es7val = 0,
      es8val = 0,
      makeUpVal = 0,
      castingVal = 0;

    // Поля для калькулятора съемки предметов
    const es_field_4_1 = document.querySelector('select[name="es_field_4-1"]'),
      es4_1text = es_field_4_1.closest(".form-calc__item").querySelector(".form-calc__price"),
      es_field_6_1 = document.getElementById("es_field_6-1"),
      es6_1text = es_field_6_1.closest(".form-calc__item").querySelector(".form-calc__price");

    let es4_1val = 0,
      es6_1val = 0;

    function calcEsVal(elem) {
      let higherVal = 0;

      elem.querySelectorAll("input").forEach((item) => {
        if (item.checked) {
          if (item.dataset.price > higherVal) {
            higherVal = +item.dataset.price;
          }
        }
      });

      return +higherVal;
    }

    // Высчитывает общую сумму
    function calcTotal() {
      calcValues();
    }

    // Высчитывает все значения
    function calcValues() {
      es1val = calcEsVal(es_field_1);
      es2val = es1val * es_field_2.value;
      es3val = +es_field_3.options[es_field_3.selectedIndex].dataset.price;
      es4val = es3val * es_field_4.value;
      es5val = es_field_5.value;

      if (es_field_2.value <= "3") {
      }

      fillPricesText();
    }

    // Заполняет текстовые поля ценами
    function fillPricesText() {
      if (createText(es2val) === "0") {
        es2text.textContent = `${createText(es2val)} р.`;
      } else {
        es2text.textContent = `~ ${createText(es2val)} р.`;
      }

      if (createText(es3val) === "0") {
        es3text.textContent = `${createText(es3val)} р.`;
      } else if (es3val === 1700) {
        es3text.textContent = `От ${createText(es3val)} р./час`;
      } else {
        es3text.textContent = `От ${createText(es3val)} р./день`;
      }

      if (createText(es4val) === "0") {
        es4text.textContent = `${createText(es4val)} р.`;
      } else {
        es4text.textContent = `~ ${createText(es4val)} р.`;
      }
    }

    // Меняет активные элементы формы в зависимости от выбранного калькулятора
    function calcSwitcher(target) {
      switcher.querySelectorAll("a").forEach((item) => {
        item.classList.remove("event-calc__buttons-item--selected");
      });

      target.classList.add("event-calc__buttons-item--selected");

      form.reset();

      if (calcType) {
        document.querySelectorAll(".form-calc__item").forEach((item) => {
          if (item.classList.contains("js-form-people")) {
            item.style.display = "none";
          } else if (item.classList.contains("js-form-objects")) {
            item.style.display = "flex";
          }
        });
      } else {
        document.querySelectorAll(".form-calc__item").forEach((item) => {
          if (item.classList.contains("js-form-people")) {
            item.style.display = "flex";
          } else if (item.classList.contains("js-form-objects")) {
            item.style.display = "none";
          }
        });
      }

      calcTotal();
    }

    // Выводит общую сумму, разделенную точками
    function createText(total) {
      let totalText = "",
        totalString = total.toString(),
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

      return totalText;
    }

    // Переключатель калькуляторов
    switcher.addEventListener("click", (event) => {
      event.preventDefault();

      const target = event.target;

      if (target.dataset.tab === "people") {
        calcType = false;
        formType.value = 1;

        calcSwitcher(target);
      } else if (target.dataset.tab === "objects") {
        calcType = true;
        formType.value = 2;

        calcSwitcher(target);
      }
    });

    form.addEventListener("change", () => {
      calcTotal();
    });

    calcSwitcher(document.getElementById("people"));
  }
});
