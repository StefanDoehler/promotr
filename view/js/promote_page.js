$(document).ready(function() 
{
	$('.submit').click(function() {
		var store_name = $('#store-name-input').prop('value');
		var store_type = $('#store-type-input').prop('value');
		var promotion_type = $('#promotion-type-input').prop('value');
		var description = $('.description-input').prop('value');
		var address = $('#address-input').prop('value');
		var location = {};

		if ($('.location-checkbox').prop('checked')) {
			if (navigator.geolocation) {
    			navigator.geolocation.getCurrentPosition(function(position) {
					lat = position.coords.latitude;
					lon = position.coords.longitude;
    			}, error, {timeout: 5000});
			} 
			else {
    			alert('Geolocation is not supported by your browser, please manually enter an address');
    			return;
			}

			if (store_name && store_type && promotion_type && description) {
				var params = {};
				var url = window.location.href + '/submit';
				params.store_name = store_name;
				params.store_type = store_type;
				params.promotion_type = promotion_type;
				params.description = description;
				params.lat = location.lat;
				params.lon = location.lon;
				post(url, params);
				alert("Your promotion was entered!");
				window.location = '/';
			}
		}
		else {
			getLatitudeLongitude(recordLatLon, address, location, function() {
				if (store_name && store_type && promotion_type && description) {
					var params = {};
					var url = window.location.href + '/submit';
					params.store_name = store_name;
					params.store_type = store_type;
					params.promotion_type = promotion_type;
					params.description = description;
					params.lat = location.lat;
					params.lon = location.lon;
					post(url, params);
					alert("Your promotion was entered!");
					window.location = '/'
				}
			});
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


// http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
function post(path, params) 
{
    var method = 'post'; 
    var form = document.createElement('form');
    form.setAttribute('method', method);
    form.setAttribute('action', path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement('input');
            hiddenField.setAttribute('type', 'hidden');
            hiddenField.setAttribute('name', key);
            hiddenField.setAttribute('value', params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}


// https://jsfiddle.net/alvaroAV/qn8bb8q5/
function getLatitudeLongitude(callback, address, location, cb) {
    // If adress is not supplied, use default value: Yale post office
    address = address || '216 Elm St., New Haven, Connecticut';
    geocoder = new google.maps.Geocoder();

    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0], location, cb);
            }
            else {
            	alert("That address does not work, please try again");
            	return;
            }
        });
    }
}


function recordLatLon(result, location, callback) 
{
	location.lat = result.geometry.location.lat();
    location.lon = result.geometry.location.lng();
    callback();
}


function error() 
{
	alert("Geolocation failed, manually enter your address");
	return;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}