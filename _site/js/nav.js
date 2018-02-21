$(document).ready(function(){

    var height_topbar = $('.topbar').outerHeight(true);
    var height_logo = $('.navbar-logo--top .navbar-item--logo, .navigation-bottom .navbar-item--logo').outerHeight(true);
    var height_nav = $('.navbar .navbar-content').outerHeight(true);
    var height_over_menu = $('.navbar-content').offset().top;
    var height_header = $('.header').outerHeight(true);
    var lastScrollPosition = 0;

    var $searchBar = $('.search-bar');
    var $navBar = $('.navbar');
    var $navBarFixed = $('.navbar-fixed .navbar-content');
    var $navBarContent = $('.navbar-content');
    var $backdrop = $('.backdrop');
    var $menumobile = $('.menu-mobile');
    var $design = $('.design');




    $(window).on('scroll', function(){
        // Hago que baje al darle al scroll hacia arriba
        var newScrollPosition = window.scrollY;

        // Muestro la navegación al subir
        if (newScrollPosition < lastScrollPosition){

            // Oculta la navegación cuando está a la altura de la cabecera
            if (newScrollPosition < height_nav + height_logo){
                $navBarFixed.addClass('is-hide');
            } else {
                $navBarFixed.removeClass('is-hide');
            }

        }

        // Oculto la navegación al bajar
        if (newScrollPosition > lastScrollPosition){
            $navBarFixed.addClass('is-hide');
        }

        lastScrollPosition = newScrollPosition;
    });




    $('.fix-header-padding').css('padding-top', (height_topbar + height_logo + height_nav) + 'px');



    var toogleMenu = function(){

        $design.toggleClass('page-is-moving');
        if ($design.hasClass('page-is-moving')) {
            $design.removeClass('page-is-static');
            $menumobile.addClass('display-block');
            $navBar.removeClass('search-is-open');

        } else{
            $design.removeClass('page-is-moving');
            $design.addClass('page-is-static');
            $menumobile.css('z-index','-6');


        }
    };

    var toogleSearch = function(){

        $navBarContent.toggleClass('search-is-open');

        if ($navBarContent.hasClass('search-is-open')) {
            $navBarContent.find('input').focus();
            $backdrop.css('display', 'block');
            $searchBar.css('opacity', '1');

        } else{
            $backdrop.css('display', 'none');
            $searchBar.css('opacity', '0');

        }

    };


    $('.js-search-toogle').on('click', function(){
        toogleSearch();
    });

    $('.js-menu-toogle').on('click', function(){
        toogleMenu();
    });


    $backdrop.on('click', function(){
        $(this).css('opacity', '0');
        $navBar.removeClass('search-is-open');

    });


    //opciones

    var $changeOption = $('.js-option');


    $changeOption.each(function(index) {
        $(this).on('click', function(){

            var dataValue         = $(this).data('value');
            var dataOption        = $(this).data('option');
            var dataElement       = $(this).data('element');
            var $element          = $(dataElement);


            $element.attr('class', function(i, c){
                var pattern = '(^|\\s)' + dataOption + '\\S+';
                var myReg  = new RegExp(pattern, "g");
                return c.replace(myReg, '');
            });
            console.log(dataElement);
            $element.addClass(dataOption + dataValue);
            var new_height_topbar = $('.topbar').outerHeight(true);
            var new_height_logo = $('.navbar-logo--top .navbar-item--logo, .navigation-bottom .navbar-item--logo').outerHeight(true);
            var new_height_nav = $('.height-nav .navbar-content').outerHeight(true);

            $('.fix-header-padding').css('padding-top', (new_height_topbar + new_height_logo + new_height_nav) + 'px');

        });
    });
});
