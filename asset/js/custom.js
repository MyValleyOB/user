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

$('#secure-message-form').submit(function(e){	
	e.preventDefault();

	console.log(e)

	let data = {
		action: "createReceipt",
		date: $('#formDate').val(),
		name: $('#formClientName').val(),
		email: $('#formClientEmail').val(),
		dob: $('#formClientDOB').val(),
		amount: $('#formAmount').val(),
		receivedBy: $('#formInitials').val(),
		pmtType: $('#CashID').prop('checked') ? "cash" : $('#CardID').prop('checked') ? "card" : $('#CheckID').prop('checked') ? "check" : null,
		last4: $('#CashID').prop('checked') ? "cash" : $('#CardID').prop('checked') && $('#CardText').val() ? $('#CardText').val() : $('#CheckID').prop('checked') && $('#CheckText').val() ? $('#CheckText').val() : null,
	}

	if(!data.date || !data.name || !data.email || !data.dob || !data.amount || !data.receivedBy || !data.pmtType || !data.last4){
		$('.msg-error').show();
		return;
	}
	if(!data.email.includes("@") || isNaN(data.dob) || isNaN(data.amount) || data.receivedBy.length != 2 || data.last4.length != 4){
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
		data: data,
		success: function (res) {
			console.log(res)
			if (res.status == "done") {
				$('.msg-error').hide();
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

$('#receiptList').ready(function(){
	$.ajax({
		url: 'https://script.google.com/macros/s/AKfycbx30xCSu4aE4l2eAJpoSbo0vWsjc46g4GS3MGxfUjFZjCJOFGA0iEYdqgGdnI6fex2I/exec',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		crossDomain: true,
		type: "POST",
		dataType: "json",
		data: {
			action: "getReceipts",
		},
		success: function (res) {
			console.log(res)
			document.getElementById("receiptList").innerHTML = `
			<tr>
				<th>Receipt ID</th>
				<th>Date</th>
				<th>Amount</th>
				<th>Received By</th>
				<th class="text-center">Download</th>
				<th class="text-center">Action</th>
			</tr>` + res.map((el)=>{
				el[1] = new Date(el[1])
				return el[0]=="NO DATA" ? `<tr><td>NO RECEIPT FOUND</td></tr>` :`
					<tr>
						<td>${el[2]}</td>
						<td>${(el[1].getMonth() + 1) + "-" + el[1].getDate() + "-" + el[1].getFullYear() }</td>
						<td>$${el[6]}</td>
						<td>${el[7]}</td>
						<td class="text-center">
							<button class="icon-btn download">
								<span class="icon">
									<img src="asset/img/download.png" alt="Download"/ class="iconBlack"/>
									<img src="asset/img/download-white.png" alt="Download"/ class="iconBlue">
								</span>
							</button>
						</td>
						<td class="text-center">
							<button class="icon-btn download">
								<span><img src="asset/img/view.png" alt="View"></span>
							</button>
						</td>
					</tr>`
			}).join("")
		},
		error: function (err) {
			$('.msg-error').show();
			console.log(err);
		}
	});
})