$(document).ready(function() 
{
	$('.submit').click(function() {
		var store_name = $('#store-name-input').prop('value');
		var store_type = $('#store-type-input').prop('value');
		var promotion_type = $('#promotion-type-input').prop('value');
		var description = $('.description-input').prop('value');
		var location = {};

		if ($('.location-checkbox').prop('checked')) {
			if (navigator.geolocation) {
    			navigator.geolocation.getCurrentPosition(function(position) {
					location.lat = position.coords.latitude;
					location.lon = position.coords.longitude;
					console.log(location.lat, location.lon);
    			}, error);
			} 
			else {
    			alert('Geolocation is not supported by your browser, please manually enter an address');
			}
		}

		if (store_name && store_type && promotion_type && description && location) {
			console.log('button worked');
		}
	})
	$('.location-checkbox').click(function() {
		if (this.checked) {
			$('#address-input').prop('disabled', true);
			$('#address-input').prop('value', '');
		}
		else {
			$('#address-input').prop('disabled', false);
		}
	});
});

function error() 
{
	console.log("Geolocation failed");
}