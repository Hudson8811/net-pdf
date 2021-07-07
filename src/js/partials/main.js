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
});