let $ = jQuery.noConflict();

$(document).ready(function () {
  $(".ec-options .tooltip").hover(
    function () {
      $(this).closest(".checkbox").find(".tooltiptext").css("visibility", "visible");
    },
    function () {
      $(this).closest(".checkbox").find(".tooltiptext").css("visibility", "hidden");
    }
  );

  $(".js-video-popup").magnificPopup({
    type: "iframe",
  });

  $(".ec-form__field input.required:not(.number-limit):not(.number-limit-2)").inputFilter(function (value) {
    return /^\d*$/.test(value);
  });
  $(".ec-form__field input.required.number-limit").inputFilter(function (value) {
    return /^[123]?$/.test(value);
  });
  $(".ec-form__field input.required.number-limit-2").inputFilter(function (value) {
    return /^[0123]?$/.test(value);
  });
  $(".ec-form__field input.required").on("change", function () {
    let value = $(this).val();
    if (value.trim() === "") {
      $(this).closest(".ec-form__field").addClass("ec-form__field--error");
    } else {
      $(this).closest(".ec-form__field").removeClass("ec-form__field--error");
    }
  });

  $(".e-select-1").on("change", function () {
    let value = $(this).val();
    if (value === "n") {
      $(".e-select-2").val("y").change();
      $(".ec-form__section--sel-1").hide().find("input").removeClass("required").prop("required", false);
    } else {
      $(".ec-form__section--sel-1").show().find("input").addClass("required").prop("required", true);
    }
  });
  $(".e-select-2").on("change", function () {
    let value = $(this).val();
    if (value === "n") {
      $(".e-select-1").val("y").change();
      $(".ec-form__section--sel-1").show().find("input").addClass("required").prop("required", true);
    }
  });

  $(".ec-form__col-field input.required").on("change", function () {
    let value = $(this).val();
    if (value.trim() === "") {
      $(this).closest(".ec-form__col-field").addClass("ec-form__col-field--error");
    } else {
      $(this).closest(".ec-form__col-field").removeClass("ec-form__col-field--error");
    }
  });

  $(".ec-form .ec-btn").on("click", function () {
    checkESform();
  });
  let globalEsPrice = 0;
  $(".ec-form").on("submit", function () {
    event.preventDefault();
    let form = $(".ec-form");
    let formId = parseInt(form.data("id"));
    if (formId === 1) {
      let es_field_1 = parseInt(form.find('input[name="es_field_1"]').val()),
        es_field_2 = parseInt(form.find('input[name="es_field_2"]').val()),
        es_field_3 = parseInt(form.find('input[name="es_field_3"]').val()),
        es_field_4 = parseInt(form.find('input[name="es_field_4"]').val()),
        es_field_5 = parseInt(form.find('input[name="es_field_5"]').val()),
        es_field_6 = parseInt(form.find('input[name="es_field_6"]').val());

      let htmlText1 = "1 камерой";
      let htmlText2 = "";
      let htmlText3 = "";

      let baseHourPrice = 7500;
      let multiple = 1;
      if (es_field_4 === 2) {
        baseHourPrice = 8500;
        htmlText1 = "2 камерами";
      } else if (es_field_4 === 3) {
        baseHourPrice = 9500;
        htmlText1 = "3 камерами";
      }

      let totalPrice = 0;
      totalPrice += baseHourPrice * es_field_1 * 2;
      totalPrice += baseHourPrice * es_field_3;

      if (es_field_5 > 2) {
        totalPrice += 2000 * es_field_5;
      }
      if (es_field_6 > 20) {
        multiple = 1.4;
        htmlText3 = "от 21";
      } else if (es_field_6 > 15) {
        multiple = 1.35;
        htmlText3 = "от 16 до 20";
      } else if (es_field_6 > 10) {
        multiple = 1.3;
        htmlText3 = "от 11 до 15";
      } else if (es_field_6 > 6) {
        multiple = 1.2;
        htmlText3 = "от 7 до 10";
      } else if (es_field_6 > 3) {
        multiple = 1.1;
        htmlText3 = "от 3 до 6";
      }
      totalPrice = totalPrice * multiple;

      totalPrice += 10000 * es_field_2;

      if (totalPrice >= 500000) {
        totalPrice = totalPrice * 0.85;
        htmlText2 = " - <span>15% скидка</span>";
      } else if (totalPrice >= 260000) {
        totalPrice = totalPrice * 0.9;
        htmlText2 = " - <span>10% скидка</span>";
      } else if (totalPrice >= 180000) {
        totalPrice = totalPrice * 0.95;
        htmlText2 = " - <span>5% скидка</span>";
      }

      totalPrice = Math.round(totalPrice);
      globalEsPrice = totalPrice;

      $(".ec-results__total .es-total > div").html("ИТОГО: " + echoNumber(totalPrice) + " р.");
      $(".ec-results__col--1 .ec-results__col-number").html(
        echoNumber(baseHourPrice) +
          " р./час * " +
          es_field_1 * 2 +
          " " +
          declOfNum(es_field_1 * 2, ["час", "часа", "часов"])
      );
      $(".ec-results__col--1 .ec-results__col-text").html(
        "Ставка за час за комплект оборудования со съемочной группой с " + htmlText1
      );
      if (es_field_2 > 0) {
        $(".ec-results__col--6 .ec-results__col-number").html("10.000 р. * " + es_field_2 + " +&nbsp;");
        $(".ec-results__col--6, .ec-results__col--2").show();
      } else {
        $(".ec-results__col--6, .ec-results__col--2").hide();
      }
      if (es_field_3 > 0) {
        $(".ec-results__col--5 .ec-results__col-number").html("&nbsp;+ " + echoNumber(baseHourPrice) + " р.");
        $(".ec-results__col--2 .ec-results__col-number").html(
          "&nbsp;* " + es_field_3 + " " + declOfNum(es_field_3, ["час", "часа", "часов"])
        );
        $(".ec-results__col--5, .ec-results__col--2").show();
      } else {
        $(".ec-results__col--5, .ec-results__col--2").hide();
      }
      if (es_field_5 > 2) {
        $(".ec-results__col--4 .ec-results__col-number").html("&nbsp;+ 2.000 р. * " + es_field_5);
        $(".ec-results__col--4").show();
      } else {
        $(".ec-results__col--4").hide();
      }

      if (htmlText2 || htmlText3) {
        let tempHtml = "&nbsp;";
        if (htmlText3) {
          tempHtml += "* " + multiple;
          $(".ec-results__col--3 .ec-results__col-text")
            .html("Коэффициент количества спикеров <br>" + htmlText3)
            .show();
        } else {
          $(".ec-results__col--3 .ec-results__col-text")
            .html("Коэффициент количества спикеров <br>" + htmlText3)
            .hide();
        }
        if (htmlText2) {
          tempHtml += htmlText2;
        }
        $(".ec-results__col--3 .ec-results__col-number").html(tempHtml);
        $(".ec-results__col--3, .ec-results__col--sep").show();
      } else {
        $(".ec-results__col--3").hide();
        if (es_field_2 > 0) {
          $(".ec-results__col--sep").show();
        } else {
          $(".ec-results__col--sep").hide();
        }
      }
      addEsCalc(globalEsPrice);

      $(".event-calc__section--3").slideDown(200, "linear", function () {
        $(".event-calc__section--4").slideDown(300, "linear", function () {
          $(".event-calc__section--5").slideDown(300, "linear");
        });
      });
    } else if (formId === 2) {
      let es_field_1 = parseInt(form.find('input[name="es_field_1"]').val()),
        es_field_2 = parseInt(form.find('input[name="es_field_2"]').val()),
        es_field_3 = form.find('select[name="es_field_3"]').val(),
        es_field_4 = parseInt(form.find('input[name="es_field_4"]').val()),
        es_field_5 = form.find('select[name="es_field_5"]').val(),
        es_field_6 = parseInt(form.find('input[name="es_field_6"]').val()),
        es_field_7 = parseInt(form.find('input[name="es_field_7"]').val());

      let htmlText1 = "Ставка за час за комплект оборудования";
      let htmlText2 = "";
      let htmlText3 = "";

      let addHoues = 2;

      if (es_field_1 >= 14) {
        addHoues = 6;
      } else if (es_field_1 >= 10) {
        addHoues = 5;
      } else if (es_field_1 >= 6) {
        addHoues = 4;
      }

      let baseHourPrice = 4500;
      let multiple = 1;
      if (es_field_4 === 1) {
        baseHourPrice = 7500;
        htmlText1 = "Ставка за час за комплект оборудования со съемочной группой с 1 камерой";
      } else if (es_field_4 === 2) {
        baseHourPrice = 8500;
        htmlText1 = "Ставка за час за комплект оборудования со съемочной группой с 2 камерами";
      }
      if (es_field_4 === 3) {
        baseHourPrice = 9500;
        htmlText1 = "Ставка за час за комплект оборудования со съемочной группой с 3 камерами";
      }

      let totalPrice = 0;
      totalPrice += baseHourPrice * (es_field_1 + addHoues);

      if (es_field_5 === "y") {
        totalPrice += 5500 * (es_field_1 + addHoues);
      }
      if (es_field_6 > 0) {
        totalPrice += 2500 * es_field_6;
      }

      if (es_field_3 === "y") {
        if (es_field_7 > 20) {
          multiple = 1.4;
          htmlText3 = "от 21";
        } else if (es_field_6 > 15) {
          multiple = 1.35;
          htmlText3 = "от 16 до 20";
        } else if (es_field_6 > 10) {
          multiple = 1.3;
          htmlText3 = "от 11 до 15";
        } else if (es_field_6 > 6) {
          multiple = 1.2;
          htmlText3 = "от 7 до 10";
        } else if (es_field_6 > 3) {
          multiple = 1.1;
          htmlText3 = "от 3 до 6";
        }
      }
      totalPrice = totalPrice * multiple;
      if (es_field_4 > 0) {
        totalPrice += 10000 * es_field_2;
      }
      if (totalPrice >= 500000) {
        totalPrice = totalPrice * 0.85;
        htmlText2 = " - <span>15% скидка</span>";
      } else if (totalPrice >= 260000) {
        totalPrice = totalPrice * 0.9;
        htmlText2 = " - <span>10% скидка</span>";
      } else if (totalPrice >= 180000) {
        totalPrice = totalPrice * 0.95;
        htmlText2 = " - <span>5% скидка</span>";
      }

      totalPrice = Math.round(totalPrice);
      globalEsPrice = totalPrice;

      $(".ec-results__total .es-total > div").html("ИТОГО: " + echoNumber(totalPrice) + " р.");
      $(".ec-results__col--1 .ec-results__col-number").html(
        echoNumber(baseHourPrice) +
          " р./час * " +
          (es_field_1 + addHoues) +
          " " +
          declOfNum(es_field_1 + addHoues, ["час", "часа", "часов"])
      );
      $(".ec-results__col--1 .ec-results__col-text").html(htmlText1);
      if (es_field_2 > 0 && es_field_4 > 0) {
        $(".ec-results__col--6 .ec-results__col-number").html("10.000 р. * " + es_field_2 + " +&nbsp;");
        $(".ec-results__col--6, .ec-results__col--2").show();
      } else {
        $(".ec-results__col--6, .ec-results__col--2").hide();
      }
      if (es_field_5 === "y") {
        $(".ec-results__col--11 .ec-results__col-number").html(
          "&nbsp;+ 5.500 р. * " +
            (es_field_1 + addHoues) +
            " " +
            declOfNum(es_field_1 + addHoues, ["час", "часа", "часов"])
        );
        $(".ec-results__col--11").show();
      } else {
        $(".ec-results__col--11").hide();
      }
      if (es_field_6 > 0) {
        $(".ec-results__col--12 .ec-results__col-number").html(
          "&nbsp;+ 2.500 р. * " + es_field_6 + " " + declOfNum(es_field_6, ["час", "часа", "часов"])
        );
        $(".ec-results__col--12").show();
      } else {
        $(".ec-results__col--12").hide();
      }

      if (htmlText2 || htmlText3) {
        let tempHtml = "&nbsp;";
        if (htmlText3 && es_field_3 === "y") {
          tempHtml += "* " + multiple;
          $(".ec-results__col--3 .ec-results__col-text")
            .html("Коэффициент количества спикеров <br>" + htmlText3)
            .show();
        } else {
          $(".ec-results__col--3 .ec-results__col-text")
            .html("Коэффициент количества спикеров <br>" + htmlText3)
            .hide();
        }
        if (htmlText2) {
          tempHtml += htmlText2;
        }
        $(".ec-results__col--3 .ec-results__col-number").html(tempHtml);
        $(".ec-results__col--3, .ec-results__col--sep").show();
      } else {
        $(".ec-results__col--3").hide();
        if (es_field_2 > 0 && es_field_4 > 0) {
          $(".ec-results__col--sep").show();
        } else {
          $(".ec-results__col--sep").hide();
        }
      }
      addEsCalc(globalEsPrice);

      if (es_field_4 > 0) {
        $(".ec-options__checkbox--type-2").show();
      } else {
        $(".ec-options__checkbox--type-2").hide().find("input").prop("checked", false);
      }

      $(".event-calc__section--3").slideDown(200, "linear", function () {
        $(".event-calc__section--5").slideDown(300, "linear");
      });
    } else if (formId === "3") {
      //   dssdfdsf
    }
  });

  function addEsCalc(globalEsPrice) {
    let form = $(".ec-options");
    let addPrice = globalEsPrice;
    form.find("input:checked").each(function () {
      addPrice += parseInt($(this).data("price"));
    });
    $(".ec-options__total .es-total__right > div").html(echoNumber(addPrice) + " р.");
  }

  $(".ec-options .checkbox").on("change", function () {
    addEsCalc(globalEsPrice);
  });

  $(".ec-options").on("submit", function () {
    event.preventDefault();
    alert("pdf отправлен");
  });
  $(".es-quest__item").on("click", function () {
    event.preventDefault();
    let id = $(this).data("id");
    $(".es-quest__flex").hide();
    $(".es-quest__thanks").show();
  });

  // Fixed header
  (function () {
    var body = $("body");
    var header = $(".header");
    var headerOffset = header.offset().top;
    var classes = "header--fixed";
    var headerHeight = header.outerHeight();
    var scroll = $(window).scrollTop();
    var isScroll = false;
    var isNotStatic = header.hasClass("header--half") && $(window).width() >= 1024 ? true : false; //(header.css('position') === 'absolute') || (header.css('position') === 'fixed') ? true : false;

    $(window).on("scroll", function () {
      scroll = $(window).scrollTop();

      if (scroll >= headerOffset + headerHeight) {
        isScroll = true;

        headerHeight = isScroll ? header.outerHeight() : null;
        header.addClass(classes);

        if (!header.hasClass("is-fixed")) {
          header
            .css({ top: -headerHeight + "px", transform: "translateY(" + headerHeight + "px)" })
            .addClass("is-fixed");

          if (!isNotStatic) {
            body.css("padding-top", headerHeight + "px");
          }
        }
      } else {
        isScroll = false;
        header.removeClass(classes + " is-fixed").removeAttr("style");
        body.css("padding-top", 0);
      }
    });
  })();
});

function declOfNum(n, text_forms) {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 == 1) {
    return text_forms[0];
  }
  return text_forms[2];
}

function checkESform() {
  $(".ec-form input.required").trigger("change");
}
function echoNumber(n) {
  return String(n).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
}

(function ($) {
  $.fn.inputFilter = function (inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  };
})(jQuery);
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".calc3")) {
    const modal = document.querySelector(".modal"),
      modalsContent = [
        {
          video1: "https://www.youtube.com/embed/V1en18UMl3s",
          title: `Копирайтинг, который
                  выполняет задачи маркетинга`,
          text: `Сильный с точки зрения маркетинга закадровый текст
                - это залог успеха любого ролика. Мы разработаем 
                для вас копирайтинг, который будет выполнять
                ту или иную задачу. В данном случае - это пример
                копирайтинга, который вызывает гордость за компанию,
                в которой работаешь. Ролик был приурочен к юбилею
                компании. `,
        },
        {
          video1: "https://www.youtube.com/embed/PmGUW76hq3Q",
          title: `У вас есть фото, которые вы хотите внедрить
                  в проект, и сделать это органично?`,
          text: `Мы предложим решение для внедрения ваших
                материалов в формате современного слайд-шоу
                с анимацией. Подгоним цветокоррекцию фотографий
                под снятый видеоматериал, чтобы он органично 
                вписался в общий визуальный ряд. В данном случае
                посмотрите на примере прямой трансляции отбороч-
                ного тура по косплею - здесь внедрили фото победи-
                телей прошлых годов.  `,
        },
        {
          video1: "https://www.youtube.com/embed/NMvBBt_bwdI",
          title: `Словами не объяснить, на видео не показать? 
                  Мы смоделируем любой объект/предмет в 3D
                  и анимируем его, покажем как он работает. `,
          text: `Сцены 3D существуют для выполнения всего двух
                задач - они либо демонстрируют то, что нельзя
                показать на видео - или это слишком мелко, или 
                этого еще нет в природе, или слишком большое
                итд... или они выполняют чисто эстетическую функ-
                цию, когда вам хочется оформить, например, заставку
                к вашему ролику в 3D. Посмотрите наше демо, чтобы
                иметь представление, какая может быть графика. `,
        },
        {
          video1: "https://www.youtube.com/embed/sTP_oYYE5eY",
          video2: "https://www.youtube.com/embed/276VvkJSJuI",
        },
        {
          video1: "https://www.youtube.com/embed/bWczx2XYsaM",
          video2: "https://www.youtube.com/embed/e7JADySvAME",
        },
        {
          video1: "https://www.youtube.com/embed/Huea4BhmGRU",
          video2: "https://www.youtube.com/embed/mEobEA6-Egg",
        },
      ];

    document.addEventListener("click", (event) => {
      const target = event.target;

      // Открытие pop-up окна "посмотреть примеры"
      if (target.classList.contains("form-calc__link")) {
        if (target.dataset.modal === "1") {
          event.preventDefault();
          modal.classList.add("video");

          const videos = modal.querySelectorAll("iframe");
          videos[0].src = modalsContent[target.dataset.content]["video1"];
          videos[1].src = modalsContent[target.dataset.content]["video2"];
        } else if (target.dataset.modal === "0") {
          event.preventDefault();
          modal.querySelector("iframe").src = modalsContent[target.dataset.content]["video1"];
          modal.querySelector(".modal-content__description-title").textContent =
            modalsContent[target.dataset.content]["title"];
          modal.querySelector(".modal-content__description-text").textContent =
            modalsContent[target.dataset.content]["text"];
        }

        modal.classList.add("active");
      }

      if (target.closest(".modal-content__close") || target.classList.contains("modal-overlay")) {
        // Закрытие pop-up окна "посмотреть примеры"
        modal.classList.remove("active");
        modal.classList.remove("video");
      }
    });
  }
});
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

          setTimeout(() => {
            item.closest("label").classList.remove("form-checkbox__error");
            item.closest(".form-calc__item").classList.remove("form-calc__item-error");
          }, 3000);
        }
      });
    });
  }
});
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
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".calc3")) {
    // Получение основных элементов на странице
    const calc = document.querySelector(".event-calc__form"),
      totalSpan = document.querySelector(".form-total__text-final"),
      priceTexts = document.querySelectorAll(".form-calc__price"),
      es_field_1 = document.querySelector('input[name="es_field_1"]'),
      es_field_2 = document.querySelector('input[name="es_field_2"]'),
      es_field_2_1 = document.querySelector('select[name="es_field_2-1"]'),
      es_field_3 = document.querySelector('select[name="es_field_3"]'),
      es_field_4 = document.querySelector('input[name="es_field_4"]'),
      es_field_4_1 = document.querySelector('select[name="es_field_4-1"]'),
      es_field_5 = document.querySelector('input[name="es_field_5"]'),
      es_field_6 = document.querySelector('input[name="es_field_6"]'),
      es_field_21 = document.querySelector('input[name="es_field_21"]'),
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

    // Текстовые поля под цены каждой из услуг
    const es2text = es_field_2.closest(".form-calc__item").querySelector(".form-calc__price"),
      es4text = es_field_4.closest(".form-calc__item").querySelector(".form-calc__price"),
      es5text = es_field_5.closest(".form-calc__item").querySelector(".form-calc__price"),
      es6text = es_field_6.closest(".form-calc__item").querySelector(".form-calc__price"),
      es21text = es_field_21.closest(".form-calc__item").querySelector(".form-calc__price"),
      es7text = es_field_7.closest(".form-calc__item").querySelector(".form-calc__price"),
      es8text = es_field_8.closest(".form-calc__item").querySelector(".form-calc__price"),
      es9text = es_field_9.closest(".form-calc__item").querySelector(".form-calc__price"),
      es10text = es_field_10.closest(".form-calc__item").querySelector(".form-calc__price"),
      es11text = es_field_11.closest(".form-calc__item").querySelector(".form-calc__price"),
      es12text = es_field_12.closest(".form-calc__item").querySelector(".form-calc__price"),
      es13text = es_field_13.closest(".form-calc__item").querySelector(".form-calc__price"),
      es14text = es_field_14.closest(".form-calc__item").querySelector(".form-calc__price"),
      es15text = es_field_15.closest(".form-calc__item").querySelector(".form-calc__price"),
      es16text = es_field_16.closest(".form-calc__item").querySelector(".form-calc__price"),
      es17text = es_field_17.closest(".form-calc__item").querySelector(".form-calc__price"),
      es18text = es_field_18.closest(".form-calc__item").querySelector(".form-calc__price"),
      es19text = es_field_19.closest(".form-calc__item").querySelector(".form-calc__price"),
      es20text = es_field_20.closest(".form-calc__item").querySelector(".form-calc__price");

    let total = 0;

    // Объявление переменных для значений цены за услугу
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
      es21val = isChecked(es_field_21) * es_field_2_1.value;
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

      fillPricesText();
    }

    // Заполняет текстовые блоки с ценами на услуги
    function fillPricesText() {
      // Зависимые от длительности ролика стоимости услуг и выбраны по-умолчанию
      es5text.textContent = createTotalText(es5val) + "р.";
      es6text.textContent = createTotalText(es6val) + "р.";
      es11text.textContent = createTotalText(es11val) + "р.";
      es14text.textContent = createTotalText(es14val) + "р.";
      es15text.textContent = createTotalText(es15val) + "р.";
      es19text.textContent = createTotalText(es19val) + "р.";
      es20text.textContent = createTotalText(es20val) + "р.";

      // Цены на услуги, которые зависят от длительсности ролика, но не выбраны по-умолчанию
      if (es3val === "1") {
        es9text.textContent = createTotalText(es_field_9.dataset.price * 1) + "р.";
        es13text.textContent = createTotalText(es_field_13.dataset.price * 1) + "р.";
        es16text.textContent = createTotalText(es_field_16.dataset.price * 1) + "р.";
      } else if (es3val === "2") {
        es9text.textContent = createTotalText(es_field_9.dataset.price * 1.2) + "р.";
        es13text.textContent = createTotalText(Math.ceil(es_field_13.dataset.price * 1.16666)) + "р.";
        es16text.textContent = createTotalText(es_field_16.dataset.price * 1.6) + "р.";
      } else if (es3val === "3") {
        es9text.textContent = createTotalText(es_field_9.dataset.price * 1.4) + "р.";
        es13text.textContent = createTotalText(Math.ceil(es_field_13.dataset.price * 2.16666)) + "р.";
        es16text.textContent = createTotalText(es_field_16.dataset.price * 3.6) + "р.";
      }

      // Цены на услуги, которые не выбраны по умолчанию
      es21text.textContent = createTotalText(es_field_21.dataset.price * es_field_2_1.value) + "р.";
      es7text.textContent = createTotalText(es_field_7.dataset.price * es_field_7_1.value) + "р.";
      es8text.textContent = createTotalText(es_field_8.dataset.price) + "р.";
      es10text.textContent = createTotalText(es_field_10.dataset.price) + "р.";
      es12text.textContent = createTotalText(es_field_12.dataset.price * es_field_12_1.value) + "р.";
      es17text.textContent = createTotalText(es_field_17.dataset.price) + "р.";
      es18text.textContent = createTotalText(es_field_18.dataset.price) + "р.";

      // Остальные стоимости услуг
      es2text.textContent = createTotalText(es2val) + "р.";
      es4text.textContent = createTotalText(es4val) + "р.";

      // Если стоимость равна 0 (эта услуга не выбрана), то не выводится ничего
      priceTexts.forEach((item) => {
        if (item.textContent === "0 р.") {
          item.textContent = "";
        }
      });
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

      // createTotalText();
      totalSpan.textContent = createTotalText(total);
    }

    // Выводит общую сумму, разделенную точками
    function createTotalText(total) {
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

      return `${totalText} `;
    }

    calc.addEventListener("change", () => {
      calcTotal();
    });

    calcTotal();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".calc3")) {
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