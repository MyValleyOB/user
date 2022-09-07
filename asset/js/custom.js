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


