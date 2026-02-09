(function (ckan, $) {
    "use strict";

    window.onscroll = function () { scrollFunction() };
    var mybutton = document.getElementById("scrollTopBtn");
    var downArrow = document.getElementById("downArrow");

    function scrollFunction() {
        if (window.pageYOffset > 1) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }

        if (downArrow != null) {
            if (window.pageYOffset >= downArrow.parentNode.offsetTop + downArrow.parentNode.offsetHeight - window.outerHeight + 150) {
                downArrow.style.display = "none";
            } else {
                downArrow.style.display = "block";
            }
        }
    }

    function topFunction() {
        $('html,body').animate({
            scrollTop: 0
        }, 800);
    }

    ckan.topFunction = topFunction;
})(this.ckan, window.jQuery);