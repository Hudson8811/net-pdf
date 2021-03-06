document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".calc4")) {
    // Получение глобальныъ элементов
    const switcher = document.querySelector(".event-calc__buttons"),
      form = document.querySelector(".event-calc__form"),
      formType = document.getElementById("hidden"),
      field = document.querySelector(".js-field"),
      peopleError = document.getElementById("people-error"),
      es7price = document.getElementById("es_field_7_price"),
      es8price = document.getElementById("es_field_8_price"),
      dailySumText = document.getElementById("dailySum"),
      finalSumText = document.getElementById("finalSum");

    // Тип калькулятора. По-умолчанию — фото с людьми
    // + Выбраны ли люди в первом поле в калькуляторе фотографий с людьми
    // + Тип луков. По-умолчанию — кэжуал
    // + Общая сумма в день
    // + Общая сумма
    let calcType = false,
      selected = false,
      flag = false,
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
      makeupVal = 0,
      castingVal = 0;

    // Поля для калькулятора съемки предметов
    const es_field_4_1 = document.querySelector('select[name="es_field_4-1"]'),
      es4_1text = es_field_4_1.closest(".form-calc__item").querySelector(".form-calc__price"),
      es_field_6_1 = document.getElementById("es_field_6-1"),
      es6_1text = es_field_6_1.closest(".form-calc__item").querySelector(".form-calc__price");

    let es4_1val = 0,
      es6_1val = 0;

    // Поле про кастинг активно только в случае выбранного значения "люди под концепцию"
    function activeField() {
      const people = es_field_1.querySelectorAll("input")[1];

      if (people.checked) {
        field.style.display = "flex";
        castingPrice.dataset.price = 1;
      } else {
        field.style.display = "none";
        castingPrice.dataset.price = 0;
      }
    }

    // При выборе более 4 человек, отключает вариант с 1-3 луками
    function activeRange() {
      if (es_field_2.value > 3) {
        if (es_field_5.selectedIndex === 0) {
          es_field_5.querySelectorAll("option")[1].selected = true;
        }
        es_field_5.querySelectorAll("option")[0].disabled = true;
      } else {
        es_field_5.querySelectorAll("option")[0].disabled = false;
      }
    }

    // Проверяет какие чекбоксы/радио-кнопки выбраны
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

    // Проверяет какой тип луков выбран
    function lookType(elem) {
      elem.querySelectorAll("input").forEach((item) => {
        if (item.checked) {
          if (item.dataset.type === "total") {
            flag = true;
          } else if (item.dataset.type === "casual") {
            flag = false;
          }
        }
      });
    }

    // Высчитывает общую сумму
    function calcTotal() {
      activeField();
      activeRange();
      calcValues();

      if (!calcType) {
        dailyTotal = es2val + es4val + es6val + es7val + es8val + es9val + makeupVal + castingVal;
      } else {
        dailyTotal = es4val + es4_1val + es6_1val + es9val;
      }

      if (es_field_3.selectedIndex === 3) {
        dailyTotal += +es_field_3.options[es_field_3.selectedIndex].dataset.price;
      }

      total = dailyTotal * es14val;

      if (es14val <= 3) {
        total += productionVal * es14val;
      } else {
        total += productionVal * 3;
      }

      if (es13val === 20000) {
        if (es14val <= 3) {
          total += es13val * es14val;
        } else {
          total += es13val * 3;
        }
      } else {
        total += es13val;
      }

      fillPricesText();
    }

    // Высчитывает все значения
    function calcValues() {
      es1val = calcEsVal(es_field_1);
      es2val = es1val * es_field_2.value;
      es3val = +es_field_3.options[es_field_3.selectedIndex].dataset.price;

      if (es_field_3.selectedIndex === 3) {
        es4val = 0;
      } else {
        es4val = es3val * es_field_4.value;
      }

      es4_1val = 15000 * es_field_4_1.value;
      es5val = es_field_5.value;

      lookType(es_field_6);

      if (es_field_2.value <= "3") {
        if (flag) {
          es6val = +es_field_5.options[es_field_5.selectedIndex].dataset.price + 5000;
        } else {
          es6val = +es_field_5.options[es_field_5.selectedIndex].dataset.price;
        }
      } else {
        if (es5val <= 15) {
          if (flag) {
            es6val = +es_field_5.options[es_field_5.selectedIndex].dataset.price + 15000;
          } else {
            es6val = +es_field_5.options[es_field_5.selectedIndex].dataset.price + 10000;
          }
        } else {
          if (flag) {
            es6val = +es_field_5.options[es_field_5.selectedIndex].dataset.price + 20000;
          } else {
            es6val = +es_field_5.options[es_field_5.selectedIndex].dataset.price + 15000;
          }
        }
      }

      es6_1val = calcEsVal(es_field_6_1);

      // es7val = calcEsVal(es_field_7) * es_field_2.value;
      if (es5val === "3") {
        es7val = calcEsVal(es_field_7) * 10000;
      } else if (es5val === "7") {
        es7val = calcEsVal(es_field_7) * 20000;
      } else if (es5val === "11") {
        es7val = calcEsVal(es_field_7) * 35000;
      } else if (es5val === "15") {
        es7val = calcEsVal(es_field_7) * 50000;
      } else if (es5val === "20") {
        es7val = calcEsVal(es_field_7) * 70000;
      } else if (es5val === "21") {
        es7val = calcEsVal(es_field_7) * 75000;
      }

      // Динамическое изменение цены у 7 поля
      if (es5val === "3") {
        es7price.textContent = `${createText(10000)} р./усл. `;
      } else if (es5val === "7") {
        es7price.textContent = `${createText(20000)} р./усл. `;
      } else if (es5val === "11") {
        es7price.textContent = `${createText(35000)} р./усл. `;
      } else if (es5val === "15") {
        es7price.textContent = `${createText(50000)} р./усл. `;
      } else if (es5val === "20") {
        es7price.textContent = `${createText(70000)} р./усл. `;
      } else if (es5val === "21") {
        es7price.textContent = `${createText(75000)} р./усл. `;
      }

      // es8val = calcEsVal(es_field_8) * es_field_2.value;
      if (es5val === "3") {
        es8val = calcEsVal(es_field_8) * 5000;
      } else if (es5val === "7") {
        es8val = calcEsVal(es_field_8) * 8000;
      } else if (es5val === "11") {
        es8val = calcEsVal(es_field_8) * 11000;
      } else if (es5val === "15") {
        es8val = calcEsVal(es_field_8) * 15000;
      } else if (es5val === "20") {
        es8val = calcEsVal(es_field_8) * 20000;
      } else if (es5val === "21") {
        es8val = calcEsVal(es_field_8) * 25000;
      }

      // Динамическое изменение цены у 8 поля
      if (es5val === "3") {
        es8price.textContent = `${createText(5000)} р./усл. `;
      } else if (es5val === "7") {
        es8price.textContent = `${createText(8000)} р./усл. `;
      } else if (es5val === "11") {
        es8price.textContent = `${createText(11000)} р./усл. `;
      } else if (es5val === "15") {
        es8price.textContent = `${createText(15000)} р./усл. `;
      } else if (es5val === "20") {
        es8price.textContent = `${createText(20000)} р./усл. `;
      } else if (es5val === "21") {
        es8price.textContent = `${createText(25000)} р./усл. `;
      }

      es9val = +es_field_9.options[es_field_9.selectedIndex].dataset.price;

      if (es_field_2.value === "1") {
        makeupVal = 8000;
      } else if (es_field_2.value === "3") {
        makeupVal = 12000;
      } else if (es_field_2.value === "6") {
        makeupVal = 16000;
      } else if (es_field_2.value === "7") {
        makeupVal = 24000;
      }

      if (es_field_2.value === "1") {
        castingVal = castingPrice.dataset.price * 10000;
      } else if (es_field_2.value === "3") {
        castingVal = castingPrice.dataset.price * 10000;
      } else if (es_field_2.value === "6") {
        castingVal = castingPrice.dataset.price * 15000;
      } else if (es_field_2.value === "7") {
        castingVal = castingPrice.dataset.price * 25000;
      }

      if (es_field_2.value === "1") {
        productionVal = 20000;
      } else if (es_field_2.value === "3") {
        productionVal = 20000;
      } else if (es_field_2.value === "6") {
        productionVal = 25000;
      } else if (es_field_2.value === "7") {
        productionVal = 35000;
      }

      es13val = calcEsVal(es_field_13);
      es14val = +es_field_14.value;
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
        es4text.textContent = ``;
      } else {
        es4text.textContent = `~ ${createText(es4val)} р.`;
      }

      es4_1text.textContent = `${createText(es4_1val)} р.`;
      es6text.textContent = `${createText(es6val)} р.`;
      es6_1text.textContent = `${createText(es6_1val)} р.`;
      es7text.textContent = `${createText(es7val)} р.`;
      es8text.textContent = `${createText(es8val)} р.`;
      es9text.textContent = `${createText(es9val)} р.`;
      makeupPrice.textContent = `${createText(makeupVal)} р.`;
      castingPrice.textContent = `${createText(castingVal)} р.`;
      productionPrice.textContent = `${createText(productionVal)} р.`;
      es13text.textContent = `${createText(es13val)} р.`;

      dailySumText.textContent = `${createText(dailyTotal + productionVal + es13val)} р.`;
      finalSumText.textContent = `${createText(total)} `;
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

    // Првоеряет, выбраны ли люди в первом калькуляторе
    function peopleSelected() {
      if (es_field_1.querySelectorAll("input")[0].checked || es_field_1.querySelectorAll("input")[1].checked) {
        selected = true;
      } else {
        selected = false;
      }
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

    form.addEventListener("change", (event) => {
      calcTotal();
      peopleSelected();

      if (!selected) {
        event.preventDefault();

        peopleError.classList.add("active");
      } else {
        peopleError.classList.remove("active");
      }
    });

    form.addEventListener("submit", (event) => {
      if (!calcType) {
        if (!selected) {
          event.preventDefault();

          peopleError.classList.add("active");
        } else {
          peopleError.classList.remove("active");
        }
      }
    });

    calcSwitcher(document.getElementById("people"));
  }
});
