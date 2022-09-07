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
		url: 'https://script.google.com/macros/s/AKfycbx30xCSu4aE4l2eAJpoSbo0vWsjc46g4GS3MGxfUjFZjCJOFGA0iEYdqgGdnI6fex2I/exec',
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
				window.location.href = "users-home.html"
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

$('#logout').click(function () {
	sessionStorage.clear()
	window.location.href = "index.html"
})