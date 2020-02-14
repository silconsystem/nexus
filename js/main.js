/*		--- main.js --- 		*/
// controls
var ioOne 			= new Nexus.Toggle('#io-one'),
	oscOneVolume 	= new Nexus.Slider('#gain-one'),
	oscOneDetune	= new Nexus.Slider('#detune-one'),
	oscOneOctave	= new Nexus.Slider('#octave-one'),
	seqIoOne		= new Nexus.Toggle('#seq-io-one');


// displays
var io_1_Display	= $('#io-one-display'),
	o_1_Vol_Display	= $('#gain-one-display'),
	o_1_Det_Display = $('#det-one-display'),
	o_1_Oct_Display	= $('#oct-one-display');

// control variable
var oscOneOct;

// control logic
// Listen for interface events

// ____on off switch
ioOne.on('change',function(v) {
	var textValue;

	// toggle on/off
	v ? oscOne.start() : oscOne.stop();

	// create string for html display
	if (ioOne.state == true) {
		textValue = "on";
  		console.log("seq start");
	}
	
	else if (ioOne.state == false) {
		textValue = "off";
		console.log('seq stop');
	}

	// show toggle state html
	io_1_Display.html('on: ' + textValue);

	console.log('on: ' + ioOne.state);
});

// ____volume slider
oscOneVolume.on('change',function(v) {
	// set volume
	vol.volume.rampTo(v,.1);

	// round up value for display
	value = Math.round(v * 100) / 100;

	// write result to html
	o_1_Vol_Display.html('vol: ' + value);

	console.log('vol: ' + value);
});
oscOneVolume.min 	= -100;
oscOneVolume.max 	= 0;
oscOneVolume.value 	= -30;

// ____detune slider
oscOneDetune.on('change',function(v) {
	// change oscillator detune
	oscOne.detune.value = v;

	o_1_Det_Display.html('det: ' + v);

	console.log('det: ' + v);
});
oscOneDetune.min 	= 0;
oscOneDetune.max 	= 100;
oscOneDetune.value 	= 0;
oscOneDetune.step 	= 1;

// ____ocvtave switch
oscOneOctave.on('change', function(v) {

	oscOneOct = v;

	//$.fn.setOctave();

	o_1_Oct_Display.html('oct: ' + oscOneOct);

	console.log('oct: ' + oscOneOct);

	return oscOneOct;
	
});
oscOneOctave.min 	= -1;
oscOneOctave.max 	= 1;
oscOneOctave.value 	= 0;
oscOneOctave.step 	= 1;

// turn on sequencer
seqIoOne.on('change', function(v) {

	var stepVal;

	// turn on sequencer
	v ? sequencer.start(500) : sequencer.stop();
	
	/*if (sequencer.stop() == true) {
		oscOne.stop();
	}*/

	console.log('seq run: ' + v);

});