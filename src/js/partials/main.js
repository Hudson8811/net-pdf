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
