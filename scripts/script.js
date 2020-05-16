var rot_x = 0;
var rot_y = 0;
var rot_z = 0;
var acc_x = 0;
var acc_y = 0;
var acc_z = 0;
var looping = true;
var cookie = "";

$(document).ready(function() {
//	getCookie();

	var deviceOrientationData = null;

	window.addEventListener('deviceorientation', function( event ) {
		deviceOrientationData = event;
		rot_x = (deviceOrientationData.beta);
		rot_y = deviceOrientationData.gamma;
		rot_z = deviceOrientationData.alpha;
		
	}, false);


	function handleMotionEvent(event) {

		acc_x = event.accelerationIncludingGravity.x;
		acc_y = event.accelerationIncludingGravity.y;
		acc_z = event.accelerationIncludingGravity.z;
	
		// Do something awesome.
	}
	
	window.addEventListener("devicemotion", handleMotionEvent, true);


	var currentScreenOrientation = window.orientation || 0; // active default

	window.addEventListener('orientationchange', function() {
		currentScreenOrientation = window.orientation;
	}, false);


	window.setInterval(function(){
		$("#data").text('Orientation');
		$("#data").append(`<br>Rotation X ${rot_x}`);
		$("#data").append(`<br>Rotation Y ${rot_y}`);
		$("#data").append(`<br>Rotation Z ${rot_z}`);
		$("#data").append(`<br>Acceleration X ${rot_x}`);
		$("#data").append(`<br>Acceleration Y ${rot_y}`);
		$("#data").append(`<br>Acceleration Z ${rot_z}`);
		$("#data").append(`<br>screen rotated ${currentScreenOrientation} degrees`);
	  }, 10);
	

	$('#loop').click(function() {
		if (looping) {
			looping = false;
			clearInterval();
		}
		else {
			looping = true;
			window.setInterval();
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
