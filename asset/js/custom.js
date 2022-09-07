// custom js
$(document).ready(function(){
	
	$('.checkText').hide();
	$(document).on('change', '.input-checkbox input[type=checkbox]', function() {
		$(this).parents('.input-checkbox').siblings().find('input[type=checkbox]').prop('checked',false);
		$(this).siblings('.checkText').show();
		$(this).parents('.input-checkbox').siblings().find('.checkText').hide();
	});
	
// document ready end 
});

$('#loginForm').submit(function (e) {
	e.preventDefault();
	const username = $('#username').val();
	const password = $('#password').val();

	if (!username || !password) {
		$('.msg-error').show();
		return;
	}

	$.ajax({
		url: 'https://script.google.com/macros/s/AKfycbzkjSD78kGFh_K2Ndq4O0JAFZ_qPxsP89ywnTV30u9cn5aTyl0213NTPl-DDlIVWz3V/exec',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		crossDomain: true,
		type: "POST",
		dataType: "json",
		data: {
			action: "login",
			username: username,
			password: password
		},
		success: function (res) {
			console.log(res)
			if (res.check) {
				sessionStorage.setItem("isLogged", res.check)
				window.location.href = "user-home.html"
			} else {
				$('.msg-error').show();
			}
		},
		error: function (err) {
			$('.msg-error').show();
			console.log(err);
		}
	});
})
