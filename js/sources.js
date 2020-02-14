/*				sound sources ToneJS 			*/
// create a volume node
var vol 		= new Tone.Volume(-Infinity),
	oscOne 		= new Tone.MonoSynth();
	//oscOneScope	= new Nexus.Oscilloscope('#scope-one'),
	piano 		= new Nexus.Piano('#piano',{
	    'size': [400,100],
	    'mode': 'button',  // 'button', 'toggle', or 'impulse'
	    'lowNote': 24,
	    'highNote': 60
	});

// display elements
var piano_display = $('#piano-display');

var keyPlayed,
	keyFrequency;

// piano keyboard
piano.on('change',function(v) {

	var piano_key;

	piano_key = v;

	for (var i = 0; i <= stdTuning.length; i++) {
		
		if (i == piano_key.note) {

			keyPlayed 		= stdTuning[i].Note;
			keyFrequency	= stdTuning[i].Frequency;

			piano_display.html('note: ' + keyPlayed
								+ " frequency: " + keyFrequency);

			console.log('note and frequency: ' + keyPlayed + " & " + keyFrequency);
			oscOne.frequency.value = parseFloat(keyFrequency);
			
		}
	}
	oscOne.triggerAttackRelease(keyPlayed, "8n");
	//oscOne.start().stop("+0.5");
  	console.log(v);
});

//Nexus.context = Tone.context;

// signal flow
oscOne.connect(envOne).toMaster();
//envOne.connect(vol);
//envOne.connect(vol).toMaster();
//oscOne.chain(vol, Tone.Master);
//trigger the envelopes attack and release "8t" apart
//envOne.triggerAttackRelease("8t");