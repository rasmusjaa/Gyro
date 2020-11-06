# Motion sensor testing for mobile browser

Demo: https://rasmusjaa.github.io/Gyro/

Quick test that checks if phone and browser support rotation and acceleration sensors. Tested on Android with Chrome browser.

Rotations and accelerations are displayed with numbers rounded to two decimals.

Visual representation by moving a ball (white div) on field (green div), either with absolute rotation values with x and y where values are clamped to +-29, or with relative values where speed is calculated from acceleration sensors (gravity included).

![Screenshot](/screenshot.png)
