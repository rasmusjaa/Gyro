var cookie = "";

$(document).ready(function() {
//	getCookie();

	$('#find').click(function() {
		if (true) {
			$("#data").text('testi');

			var deviceOrientationData = null;

			window.addEventListener('deviceorientation', function( event ) {
				deviceOrientationData = event;
			}, false);
			console.log(deviceOrientationData);
		}
	});

});

window.onunload = function () {
	if ($("#remember").is(':checked')) {
		writeCookie();
	} else {
		deleteCookie()
	}
};

function writeCookie() {
	var now = new Date();
	now.setMonth( now.getMonth() + 1 );
	var x = JSON.stringify("cookie");
	document.cookie = `cookie=${x};`
	document.cookie = `remember="${$("#remember").is(':checked')}";`
	document.cookie = `expires=${now.toUTCString()};`
};

function getCookie() {
	if (document.cookie) {
		var cookiearray = document.cookie.split(';');
		var value;
		cookiearray.forEach(function (item, index) {
			value = item.trim();
			if (value.startsWith("cookie")) {
				cookie = value.substring(8, value.length - 1); // using substring instead of '=' split to handle coordinates
			}
			else if (value.startsWith("remember"))
			{
				$("#remember").prop("checked", value.substring(10, value.length - 1));
			}
		});
	};
};

function deleteCookie() {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var thisCookie = cookies[i];
		var eqPos = thisCookie.indexOf("=");
		var name = eqPos > -1 ? thisCookie.substr(0, eqPos) : thisCookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
}
