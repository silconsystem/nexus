/*				sound sources ToneJS 			*/
// create a volume node
var vol 		= new Tone.Volume(-Infinity).toDestination(),
	oscOne 		= new Tone.Oscillator(),
	oscOneScope	= new Nexus.Oscilloscope('#scope-one'),
	piano 		= new Nexus.Piano('#piano',{
	    'size': [400,100],
	    'mode': 'button',  // 'button', 'toggle', or 'impulse'
	    'lowNote': 24,
	    'highNote': 60
	});

piano.on('change',function(v) {

  console.log(v);
});

//Nexus.context = Tone.context;

// signal flow
oscOne.connect(vol, Tone.Master);