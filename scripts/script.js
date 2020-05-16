var rot_x = 0;
var rot_y = 0;
var rot_z = 0;
var acc_x = 0;
var acc_y = 0;
var acc_z = 0;
var ball_x = 0;
var ball_y = 0;
var looping = true;
var cookie = "";

$(document).ready(function() {
//	getCookie();

	var deviceOrientationData = null;

	window.addEventListener('deviceorientation', function( event ) {
		deviceOrientationData = event;
		if (event)
		{
			// X -180 - 180
			rot_x = deviceOrientationData.beta.toFixed(2);
			// X -90 - 90, loops twice over
			rot_y = deviceOrientationData.gamma.toFixed(2);
			// Z -180 - 180
			rot_z = deviceOrientationData.alpha.toFixed(2);
		}
	}, false);


	function handleMotionEvent(event) {
		if (event && event.accelerationIncludingGravity
			&& event.accelerationIncludingGravity.x
			&& event.accelerationIncludingGravity.y
			&& event.accelerationIncludingGravity.z)
		{
			// with gravity 9,807 m/s²
			acc_x = event.accelerationIncludingGravity.x.toFixed(2);
			acc_y = event.accelerationIncludingGravity.y.toFixed(2);
			acc_z = event.accelerationIncludingGravity.z.toFixed(2);
		}
	}
	
	window.addEventListener("devicemotion", handleMotionEvent, true);


	var currentScreenOrientation = window.orientation || 0; // active default

	window.addEventListener('orientationchange', function() {
		currentScreenOrientation = window.orientation;
	}, false);


	window.setInterval(function(){
		if (looping)
		{
			$("#data").text('Orientation');
			$("#data").append(`<br>Rotation X ${rot_x}`);
			$("#data").append(`<br>Rotation Y ${rot_y}`);
			$("#data").append(`<br>Rotation Z ${rot_z}`);
			$("#data").append(`<br>Acceleration X ${acc_x}`);
			$("#data").append(`<br>Acceleration Y ${acc_y}`);
			$("#data").append(`<br>Acceleration Z ${acc_z}`);
			$("#data").append(`<br>screen rotated ${currentScreenOrientation} degrees`);
			
			var ball = document.getElementById('ball');
			ball_x = clamp(rot_x, -29, 29) * 5 + 145;
			ball_y = clamp(rot_y, -29, 29) * 5 + 145;
			ball.style.top = ball_x+'px';
			ball.style.left = ball_y+'px';
		}
	}, 10);
	

	$('#loop').click(function() {
		if (looping) {
			looping = false;
		}
		else {
			looping = true;
		}
	});

});

function clamp(num, min, max) {
	return num <= min ? min : num >= max ? max : num;
}

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
