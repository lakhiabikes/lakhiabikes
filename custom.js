$(document).ready(function() {
"use strict";

/*
|----------------------------------------------------------------------------
| PRELOADER
|----------------------------------------------------------------------------
*/
// makes sure the whole site is loaded
$(window).on('load', function() {
   // will first fade out the loading animation
   $(".spinner").fadeOut();
   //then background color will fade out slowly
   $(".pre-loader").delay(200).fadeOut("slow");
});


/*
|----------------------------------------------------------------------------
| STICKY NAVBAR
|----------------------------------------------------------------------------
*/
if ( matchMedia( 'only screen and (min-width: 768px)' ).matches ) {
   $(document).on('scroll', function() {
      var scrollPos = $(this).scrollTop();

      if( scrollPos > 150 ) {
         $('.navbar-fixed-top').removeClass('navbar-home');
      } else {
         $('.navbar-fixed-top').addClass('navbar-home');
      }
   });
}



/*
|----------------------------------------------------------------------------
| SCROLL THROUGH PAGE
|----------------------------------------------------------------------------
*/
$('.navbar-nav').onePageNav({
  currentClass: 'active',
  scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
  scrollSpeed: 1000
});

$('.navbar-nav').localScroll({
  offset: -80
});



/*
|----------------------------------------------------------------------------
| MIXITUP
|----------------------------------------------------------------------------
*/
$('.gallery-items').mixItUp();



/*
|----------------------------------------------------------------------------
| AJAX CONTACT FORM
|----------------------------------------------------------------------------
*/
// Function for email address validation
function isValidEmail(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

	return pattern.test(emailAddress);
}


$("#contact-form").on('submit', function(e) {
    e.preventDefault();
    var data = {
        name: $("#name").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        url: $("#website").val(),
        message: $("#message").val()
    };

    if ( isValidEmail(data.email) && (data.message.length > 1) && (data.name.length > 1) ) {
        $.ajax({
            type: "POST",
            url: "sendmail.php",
            data: data,
            success: function() {
                $('.contact-form .success-msg').delay(500).fadeIn(1000);
                $('.contact-form .error-msg').fadeOut(500);
            }
        });
    } else {
        $('.contact-form .error-msg').delay(500).fadeIn(1000);
        $('.contact-form .success-msg').fadeOut(500);
    }

    return false;
});



/*
|----------------------------------------------------------------------------
| CONTACT FORM ANIMATION
|----------------------------------------------------------------------------
*/
var inputBox = $('.form-control');

$(inputBox).on({
	focus: function() {
	   $(this).closest('.input-group').addClass('active');
	},

	blur: function() {
   	$(this).closest('.input-group').removeClass('active');
	}
});



/*
|----------------------------------------------------------------------------
| CAROUSEL
|----------------------------------------------------------------------------
*/
$('.home .owl-carousel').owlCarousel({
	items: 1,
	autoplay: true,
	loop: true
});

$('.base-slider').owlCarousel({
	items: 1,
	autoplay: true,
	loop: true,
	autoheight: true
});

$('.about-us .owl-carousel').owlCarousel({
	nav: true,
	dots: false,
	margin: 30,
	navText: ['&#xf104;', '&#xf105;'],
	responsiveClass: true,
	responsive: {
		0: {
			items: 1
		},

		481: {
			items: 2
		}
	}
});

$('.our-team .owl-carousel').owlCarousel({
	nav: true,
	dots: false,
	margin: 30,
	navText: ['&#xf104;', '&#xf105;'],
	responsiveClass: true,
	responsive: {
		0: {
			items: 1
		},

		481: {
			items: 2
		},
		1200: {
			items: 3
		}
	}
});



/*
|----------------------------------------------------------------------------
| LIGHTBOX
|----------------------------------------------------------------------------
*/
$('.lightbox').nivoLightbox();


/*
|----------------------------------------------------------------------------
| Show and Hide the button
|----------------------------------------------------------------------------
*/
$(function(){
	$(document).on( 'scroll', function(){
		if ($(window).scrollTop() > 500) {
			$('.goto').addClass('show');
		} else {
			$('.goto').removeClass('show');
		}
	});
	$('.goto').on('click', scrollToTop);
});

});


/*
|----------------------------------------------------------------------------
| GOOGLE MAPS
|----------------------------------------------------------------------------
*/
new Maplace({
	locations: [{
		lat: -33.9158947,
		lon: 151.1555984,
		zoom: 16
	}],

	map_options: {
		scrollwheel: false,
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl: false,
		panControl: false
	}
}).Load();

/*
|----------------------------------------------------------------------------
| AJAX SUBSCRIBE
|----------------------------------------------------------------------------
*/
$("#subscribe").ajaxChimp({
    callback: mailchimpCallback,
    url: "http://codepassenger.us10.list-manage.com/subscribe/post?u=6b2e008d85f125cf2eb2b40e9&id=6083876991" // Replace your mailchimp post url inside double quote "".  
});

function mailchimpCallback(resp) {
     if(resp.result === 'success') {
        $('.subscribe .success-msg')
            .html(resp.msg)
            .delay(500)
            .fadeIn(1000);

        $('.subscribe .error-msg').fadeOut(500);
        
    } else if(resp.result === 'error') {
        $('.subscribe .error-msg')
            .html(resp.msg)
            .delay(500)
            .fadeIn(1000);
            
        $('.subscribe .success-msg').fadeOut(500);
    }  
};

/*
|----------------------------------------------------------------------------
| Scroll to top
|----------------------------------------------------------------------------
*/
function scrollToTop() {
	verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
	element = $('body');
	offset = element.offset();
	offsetTop = offset.top;
	$('html, body').animate({scrollTop: offsetTop}, 800, 'linear');
}