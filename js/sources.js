/*				sound sources ToneJS 			*/

// create a volume node
var vol = new Tone.Volume(-Infinity).toDestination(),
	oscOne = new Tone.Oscillator();

// signal flow
oscOne.connect(vol);