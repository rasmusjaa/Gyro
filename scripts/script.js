var rot_x = 0;
var rot_y = 0;
var rot_z = 0;
var acc_x = 0;
var acc_y = 0;
var acc_z = 0;
var ball_x = 150.5;
var ball_y = 150.5;
var move_x = 150.5;
var move_y = 150.5;
var looping = false;
var gravity = false;
var cookie = "";
var ball = null;

$(document).ready(function() {
//	getCookie();
	ball = document.getElementById('ball');

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
			$("#data").text(``);
			$("#data").append(`
			Rotation X ${rot_x}
			<br>Rotation Y ${rot_y}
			<br>Rotation Z ${rot_z}
			<br>Acceleration X ${acc_x}
			<br>Acceleration Y ${acc_y}
			<br>Acceleration Z ${acc_z}
			<br>screen rotated ${currentScreenOrientation} degrees`);
			
			if (gravity) {
				move_x = clamp(rot_x, -29, 29) / 10;
				move_y = clamp(rot_y, -29, 29) / 10;
				ball_x = ball_x + move_x;
				ball_y = ball_y + move_y;
				ball_x = clamp(ball_x, 0, 290);
				ball_y = clamp(ball_y, 0, 290);
				ball.style.top = ball_x+'px';
				ball.style.left = ball_y+'px';
			} else {
				ball_x = clamp(rot_x, -29, 29) * 5 + 145;
				ball_y = clamp(rot_y, -29, 29) * 5 + 145;
				ball.style.top = ball_x+'px';
				ball.style.left = ball_y+'px';
			}
		} else {
			$("#data").text(`Phone and browser must support motion sensors and they must be allowed for this site.
			 Hold the phone screen up or put it on a table and press Start. Rotate your phone to check sensor data. 
			 Visual representation uses x and y axis and is clamped within 30 degrees.`);
		}
	}, 10);
	

	$('#loop').click(function() {
		if (looping) {
			$('#loop').removeClass("black");
			looping = false;
		}
		else {
			$('#loop').addClass("black");
			looping = true;
		}
	});

	$('#gravity').click(function() {
		if (gravity) {
			$('#gravity').removeClass("black");
			gravity = false;
		}
		else {
			$('#gravity').addClass("black");
			gravity = true;
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
