"use strict";

const website = (function() {
// Responsive state management
	const responsiveStates = (function() {

		function init() {
			ssm.addStates([
				{
					id: 'xs',
					maxWidth: 767,
					colorbox: false,
					onEnter: () => {
						console.log('Enter mobile');
					},
					onLeave: () => {
						console.log('Leave mobile');
					}
				},
				{
					id: 'sm',
					minWidth: 768,
					maxWidth: 991,
					colorbox: false
				},
				{
					id: 'md',
					minWidth: 992,
					maxWidth: 1199
				},
				{
					id: 'lg',
					minWidth: 1200
				}
			]);
		}

		function current(state) {
			const states = ssm.getCurrentStates();

			for (let prop in states) {
				if (states.hasOwnProperty(prop)) {
					if (states[prop].id === state) {
						return true;
					}
				}
			}

			return false;
		}

        return {
            init: init,
            current: current
        };
	}());


// Cookies
    const cookiePolicy = (function(){
    	const $cookie = $('#cookie');

        function init() {
            let cookie = Cookies.get('CLIENTNAMEcookie');

            if(cookie === undefined){
            	$cookie.addClass('active');
                $cookie.on('click','.close', close);
                Cookies.set('CLIENTNAMEcookie', 'true', { expires: 60*60*24*365 });
            }
            else{
                close();
            }
        }

        function close() {
            $cookie.remove();
            return false;
        }

        return {
            init: init
        };
	}());


// Form validation, add class of .form-vaildate around the form to validate
	const siteForms = (function () {
		const $forms = $('.form-validate');

		function init() {
			$forms.bootstrapValidator({
				excluded: [':disabled'],
				feedbackIcons: {
				valid: 'icon-ok',
				invalid: 'icon-cancel',
				validating: 'icon-loading'
				}
			});
		}

		return {
			init: function () {
				if ($forms.length) {
					init();
				}
			}
		};
	}());


// Global init function
	return {
		init: function () {
			responsiveStates.init();

			cookiePolicy.init();

			siteForms.init();

			// $('.cycle-slideshow').slick({
			// 	prevArrow: '<a href="#" class="cycle-prev"><i class="icon-chevron-left"></i></a>',
			// 	nextArrow: '<a href="#" class="cycle-next"><i class="icon-chevron-right"></i></a>'
			// });

			// SVG fallback
			// if (!Modernizr.svg) {
			// 	$('img[src*="svg"]').attr('src', function () {
			// 		return $(this).attr('src').replace('.svg', '.png');
			// 	});
			// }

			// $('input, textarea').placeholder();

		}

	};

}());

$(document).ready(website.init);
