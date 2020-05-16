var absolute = false;
var rot_x = 0;
var rot_y = 0;
var rot_z = 0;
var acc_x = 0;
var acc_y = 0;
var acc_z = 0;
var ball_x = 150.5;
var ball_y = 150.5;
var move_x = 0;
var move_y = 0;
var looping = false;
var gravity = false;
var ball = null;

$(document).ready(function() {
	ball = document.getElementById('ball');

	window.addEventListener('deviceorientation', function( event ) {
		if (event
			&& event.absolute
			&& event.alpha
			&& event.beta
			&& event.gamma)
		{
			absolute = event.absolute;
			// X -180 - 180
			rot_x = event.beta.toFixed(2);
			// Y -90 - 90, loops twice over
			rot_y = event.gamma.toFixed(2);
			// Z 0 - 360
			rot_z = event.alpha.toFixed(2);
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

	var currentScreenOrientation = window.orientation || 0;
	window.addEventListener('orientationchange', function() {
		currentScreenOrientation = window.orientation;
	}, false);

	window.setInterval(function(){
		if (looping)
		{
			$("#data").text(``);
			$("#data").append(`
			Absolute (z to north): ${absolute}
			<br>Rotation X ${rot_x}
			<br>Rotation Y ${rot_y}
			<br>Rotation Z ${rot_z}
			<br>Acceleration X ${acc_x}
			<br>Acceleration Y ${acc_y}
			<br>Acceleration Z ${acc_z}
			<br>screen rotated ${currentScreenOrientation} degrees`);
			
			if (gravity) {
				move_x = acc_x * -1;
				move_y = acc_y * 1;
				ball_x = ball_x + move_x;
				ball_y = ball_y + move_y;
				ball_x = clamp(ball_x, 0, 288);
				ball_y = clamp(ball_y, 0, 288);
				ball.style.left = ball_x+'px';
				ball.style.top = ball_y+'px';
			} else {
				ball_x = clamp(rot_x, -29, 29) * 5 + 144;
				ball_y = clamp(rot_y, -29, 29) * 5 + 144;
				ball.style.top = ball_x+'px';
				ball.style.left = ball_y+'px';
			}
		} else {
			$("#data").text(`Phone and browser must support motion sensors and they must be allowed for this site.
			 Hold the phone screen up and press Start. Rotate your phone to check sensor data. 
			 Visual representation uses x and y axis, rotation is clamped within 30 degrees.`);
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

			const sensor = new AbsoluteOrientationSensor();
				Promise.all([navigator.permissions.query({ name: "accelerometer" }),
							navigator.permissions.query({ name: "magnetometer" }),
							navigator.permissions.query({ name: "gyroscope" })])
					.then(results => {
						if (results.every(result => result.state === "granted")) {
						sensor.start();
						console.log(sensor);
						} else {
						console.log("No permissions to use AbsoluteOrientationSensor.");
						}
			});
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