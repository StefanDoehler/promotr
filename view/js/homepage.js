$(document).ready(function() {
	var url = window.location.href;
	$('.search').click(function() {
		window.location.href = url + 'search';
	});
	$('.promote').click(function() {
		window.location.href = url + 'promote';
	});
	$('.initialize-db').click(function() {
		var url = window.location.href + 'setup'
		get(url);
	})
});

function get(path) 
{
    var method = 'get'; 
    var form = document.createElement('form');
    form.setAttribute('method', method);
    form.setAttribute('action', path);

    document.body.appendChild(form);
    form.submit();
}