/*				sound sources ToneJS 			*/
// create a volume node
var vol 		= new Tone.Volume(-Infinity),
	oscOne 		= new Tone.Oscillator();
	//oscOneScope	= new Nexus.Oscilloscope('#scope-one'),
	piano 		= new Nexus.Piano('#piano',{
	    'size': [400,100],
	    'mode': 'button',  // 'button', 'toggle', or 'impulse'
	    'lowNote': 24,
	    'highNote': 60
	});

var keyPlayed;

piano.on('change',function(v) {

	var piano_key;

	piano_key = v;

	for (var i = 0; i <= stdTuning.length; i++) {
		
		if (i == piano_key.note) {

			keyPlayed 	= stdTuning[i].Note;

			console.log('key played: ' + keyPlayed);
		}
	}

  console.log(v);
});

//Nexus.context = Tone.context;

// signal flow
oscOne.connect(envOne).connect(vol).toMaster();
//envOne.connect(vol).toMaster();
//oscOne.chain(vol, Tone.Master);
//trigger the envelopes attack and release "8t" apart
//envOne.triggerAttackRelease("8t");