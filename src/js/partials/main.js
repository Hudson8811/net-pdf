let $ = jQuery.noConflict();

$(document).ready(function() {
    $(".ec-options .tooltip").hover(
        function() {
            $(this).closest('.checkbox').find('.tooltiptext').css("visibility", "visible");
        },
        function() {
            $(this).closest('.checkbox').find('.tooltiptext').css("visibility", "hidden");
        }
    );

    $('.js-video-popup').magnificPopup({
        type: 'iframe'
    });


    $('.ec-form__field ')

});