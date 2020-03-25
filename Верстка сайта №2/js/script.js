let imageArray = document.getElementsByClassName("work-image-item");
$(function filter() {
    $(".work-tab-item").on("click", function() {
        $(".work-image-item").hide();
        $(".work-tab-item").removeClass("work-tab-item-active");
        $(this).addClass("work-tab-item-active");
        imageArray = document.getElementsByClassName($(this).attr("data-type"));
        for (let index = 0; index < imageArray.length; index++) {
            $(imageArray[index]).show();
        }
    });
});

$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        items: 8
    });
});

if($(window).width() < 420) {
    $(".owl-carousel").owlCarousel({
        items: 3
    });
}