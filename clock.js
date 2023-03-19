"use strict";
var $ = function(id) { return document.getElementById(id); };

//global stop watch timer variable and elapsed time object
var stopwatchTimer;
var elapsedMinutes = 0;
var elapsedSeconds = 0;
var elapsedMilliseconds = 0;

var displayCurrentTime = function() {
    const date = new Date();
    let hrs = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let ampm = hrs >= 12 ? 'PM' : 'AM';

    if (hrs > 12){
        hrs -= 12;
    }
    else if (hrs === 0) {
        hrs = 12;
    }

    $("hours").innerHTML = padSingleDigit(hrs);
    $("minutes").innerHTML = padSingleDigit(min);
    $("seconds").innerHTML = padSingleDigit(sec);
    $("ampm").innerHTML = ampm;
};

var padSingleDigit = function(num) {
    if (num < 10) {	return "0" + num; }
    else { return num; }
};

var tickStopwatch = function() {    

    elapsedMilliseconds += 10;   // increment milliseconds by 10 milliseconds

    if (elapsedMilliseconds == 1000) {  // if milliseconds total 1000, increment seconds by one and reset milliseconds to zero
      elapsedSeconds ++;
      elapsedMilliseconds = 0;
    }
    if (elapsedSeconds == 60) {  // if seconds total 60, increment minutes by one and reset seconds to zero
      elapsedMinutes ++;
      elapsedSeconds = 0;
    }

    //display new stopwatch time
    $("s_minutes").innerHTML = padSingleDigit(elapsedMinutes);
    $("s_seconds").innerHTML = padSingleDigit(elapsedSeconds);
    $("s_ms").innerHTML = padSingleDigit(elapsedMilliseconds);   
    
};

// event handler functions
var startStopwatch = function(evt) {
    // prevent default action of link
    evt.preventDefault();

    tickStopwatch(); // do first tick of stop watch and then set interval timer to tick 
    stopwatchTimer = setInterval(tickStopwatch, 10); // stop watch every 10 milliseconds. Store timer object in stopwatchTimer 
    
    // variable so next two functions can stop timer.

    
};

var stopStopwatch = function(evt) {
    // prevent default action of link
    evt.preventDefault();
    // stop timer
    clearInterval(stopwatchTimer);
};

var resetStopwatch = function(evt) {
    // prevent default action of link
    evt.preventDefault();
    
    // stop timer
    clearInterval(stopwatchTimer);
    
    // reset elapsed variables and clear stopwatch display
    [elapsedMilliseconds,elapsedSeconds,elapsedMinutes] = [0,0,0];
    [$("s_minutes").innerHTML, $("s_seconds").innerHTML,  $("s_ms").innerHTML] = ["00", "00", "000"]
    
};

window.onload = function() {
    displayCurrentTime();
    setInterval(displayCurrentTime, 1000);
    // set initial clock display and then set interval timer to display
    // new time every second. Don't store timer object because it 
    // won't be needed - clock will just run.
    

    // set up stopwatch event handlers
    $("start").onclick = startStopwatch;
    $("stop").onclick = stopStopwatch;
    $("reset").onclick = resetStopwatch;
    
};