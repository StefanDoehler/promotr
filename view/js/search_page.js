$(document).ready(function() 
{
	var url = window.location.href + '/results';
	$('.search').click(function() {
		console.log("in here");
		get(url);
	});

	var obj = {
		store_name: 'Stefan\'s Bakery',
		store_type: 'food',
		promotion_type: 'sale',
		description: 'Buy 1 donut get the next one free'
	};


	httpGetAsync(url, function(result) {
		setTimeout(function() {
			result = JSON.parse(result);
			var l = result.length;
			var cell_num = 0;
			// blank cell if odd number of promotions
			var dummy = {store_name: '', promotion_type: '', description: ''};
			for (var i = 0; i < l; i += 2) {
				var cell1 = createCell(result[i], cell_num);
				cell_num += 1;
				if (cell_num > 3) {
					cell_num = 0;
				}
				var cell2;
				if (i+1 >= l) {
					cell2 = createCell(dummy, cell_num);
					cell_num += 1;
					if (cell_num > 3) {
						cell_num = 0;
					}
				}
				else {
					cell2 = createCell(result[i+1], cell_num);
					cell_num += 1;
					if (cell_num > 3) {
						cell_num = 0;
					}
				}
				var row = createRow(cell1, cell2);
				console.log(row);
				$('.results-table tbody').append(row);
			}
		}, 200);
	});
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


function createRow(cell1, cell2)
{
	return '<tr>' + cell1 + cell2 + '</tr>';
}


function createCell(promotion, n) 
{
	var classes = ['table-cell1', 'table-cell2', 'table-cell3', 'table-cell4'];
	var name = promotion.store_name;
	var btype = promotion.store_type;
	var ptype = promotion.promotion_type;
	var desc = promotion.description;

	var html = 
		'<td class=\'td-class\'><div class=\'' + classes[n] + '\'>' +
		'<p class=\'store-name\'>' + name + '</p>' +
		'<p class=\'ptype\'>' + ptype + '</p>' +
		'<p class=\'desc\'>' + desc + '</p>' +
		'</div>' + '</td>';

	return html;
}


// http://stackoverflow.com/questions/247483/http-get-request-in-javascript
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}