$(function() {
	var url = window.location.pathname;
	var template = url.substring(url.lastIndexOf('/') + 1);
	if (template.length > 0){
		$("#navigation #"+ template).css({
			backgroundColor: "gold"
		});
	}
	else {
		$("#navigation #home").css({
			backgroundColor: "gold"
		});
	}
	if (template == "rush")
		$('#header').addClass('inverted');
	$('#header').css({
		visibility: 'visible'
	});
});