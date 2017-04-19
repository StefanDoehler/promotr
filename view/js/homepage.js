$(document).ready(function() {
	var url = window.location.href;
	$('.search').click(function() {
		window.location.href = url + 'search';
	});
	$('.promote').click(function() {
		window.location.href = url + 'promote';
	});
});