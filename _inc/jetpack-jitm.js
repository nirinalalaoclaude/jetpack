/* global jitmL10n, jQuery */

(function($, jitmL10n) {

	///////////////////////////////////////
	// INIT
	///////////////////////////////////////

	var data;

	$(document).ready(function () {

		data = {
			'action'        :   'jitm_ajax',
			'jitmNonce'     :   jitmL10n.jitm_nonce,
			'photon'        :   jitmL10n.photon_msgs
		};

		initEvents();

	});

	///////////////////////////////////////
	// FUNCTIONS
	///////////////////////////////////////

	function initEvents() {
		// On dismiss of JITM admin notice
		$('.jp-jitm .dismiss').click(function() {
			// hide the notice
			$('.jp-jitm').hide();

			// ajax request to save dismiss and never show again
			data.jitmActionToTake = 'dismiss';
			module_slug = $(this).data('module');
			data.jitmModule = module_slug;

			$.post( jitmL10n.ajaxurl, data, function (response) {
				if ( true == response['success'] ) {
					//console.log('successfully dismissed for ever')
				}
			});
		});

		$('.jp-jitm .activate').click(function() {

			data.jitmActionToTake = 'activate';

			// get the module we're working with using the data-module attribute
			module_slug = $(this).data('module');
			success_msg = data[module_slug]['success'];
			fail_msg = data[module_slug]['fail'];

			data.jitmModule = module_slug;

			// since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
			$.post( jitmL10n.ajaxurl, data, function (response) {
				// If there's no response, something bad happened
				if ( true == response['success'] ) {
					$('.jp-jitm').html('<p><span class="icon"></span>'+success_msg+'</p>');
					hide_msg = setTimeout(function () {
						$('.jp-jitm').hide('slow');
					}, 5000);
				} else {
					$('.jp-jitm').html('<p><span class="icon"></span>'+fail_msg+'</p>');
				}
			});

		});
	}

})(jQuery, jitmL10n);