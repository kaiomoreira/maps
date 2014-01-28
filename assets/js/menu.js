$(document).ready(function () {
    $('.menu li').click(function (ev) {
        $(this).find('>ul').slideToggle();
        ev.stopPropagation();
    });
    $(".menu, .menu > li").mouseleave(function () {
        $(".menu li ul").slideUp();
        $(".menu.menu-small li ul").slideUp();
    });
    if ($(window).width() < 980) {
        $(".menu").addClass("menu-small");
        $(".page-wrap").addClass("page-small");
    }
    $(window).resize(function () {
        if ($(window).width() <= 979) {
            $(".menu").addClass("menu-small");
            $(".page-wrap").addClass("page-small");
        }
        if ($(window).width() >= 979) {
            $(".menu").removeClass("menu-small");
            $(".page-wrap").removeClass("page-small");
        }
        if ($("body").hasClass('active')) {
		    $(".menu").addClass("menu-small");
            $(".page-wrap").addClass("page-small");
		}
    });
    $("#menu-icon").click(function () {
    	$("body").toggleClass("active");
        $(".menu").toggleClass("menu-small");
        $(".page-wrap").toggleClass("page-small");
    });
});
