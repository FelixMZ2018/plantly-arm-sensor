'use strict';

var spi = require('spi-device'),
  mcp41050;

// Drive the digital potentiometer with values
// initially turn on (FF), turn off (00) LED, wait for 5 seconds and turn on (FF) the LED

// The MCP41050 is coupled to the SPI interface of the Pi Zero
mcp41050 = spi.open(0, 0, function (err) {
  // An SPI message is an array of one or more read+write transfers
  var message = [{
    sendBuffer: new Buffer([0x11, 0xFF]), // Initially turn on LED
    byteLength: 2,
    speedHz: 61000 // Use a low bus speed to set values
  }];
  
  if (err) throw err;
  
  console.log('LED is initially on with control value of ' + message[0].sendBuffer[0] + ' and a value of ' + message[0].sendBuffer[1]);

  mcp41050.transfer(message, function (err, message) {

	
function shutoff() {
    // shut off LED
	message[0].sendBuffer[0] = 0x11;
    	message[0].sendBuffer[1] = 0x00;
	console.log('LED is now shut off for 5 seconds with a control value of ' + message[0].sendBuffer[0] + ' and a value of ' + message[0].sendBuffer[1]);
}

function turnon() {
    	// turn on LED
	message[0].sendBuffer[0] = 0x11;
    	message[0].sendBuffer[1] = 0xFF;
	console.log('turn LED back on with control value of ' + message[0].sendBuffer[0] + ' and a value of ' + message[0].sendBuffer[1]);
}

// call the first chunk of code right away
shutoff();

// call the rest of the code and have it execute after 5 seconds
setTimeout(turnon, 5000);
	
	    if (err) throw err;
		
  });