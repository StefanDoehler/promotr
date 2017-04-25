$(document).ready(function() 
{
	$('.search').click(function() {
		console.log("in here");
		var url = window.location.href + '/results';
		get(url);
	});
});

function get(path) {
	var method = 'get';
	var form = document.createElement('form');
	form.setAttribute('method', method);
    form.setAttribute('action', path);

    document.body.appendChild(form);
    form.submit();
}