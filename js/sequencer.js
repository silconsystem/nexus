/*			sequencer.js 			*/
// ___GLOBALS
var pattern,
	row_1,
	row_2,
	row_3,
	row_4,	
	midOctave,
	lowOctave,
	highOctave,
	midFreq,
	lowFreq,
	highFreq,
	activeFreqValue,
	activeNoteValue; 
/*
var seq = new Tone.Sequence(function(time, note){
	console.log(note);
//straight quater notes
}, ["C4", "E4", "G4", "A4"], "4n");
*/
// create counter value
var counter = new Nexus.Counter(0,15);
counter.min = 0;
counter.max = 15;
counter.value = 0;

// note frequencies to test against
// JSON tuning data
var stdTuning 			= JSON.parse(JSON.stringify(standardTuning));
var pythaTuning			= JSON.parse(JSON.stringify(pythagoreanTuning));

var stdTuningNotes 		= [],
	stdTuningFreq 		= [],
	pythaTuningNotes	= [],
	pythaTuningFreq		= [];

// populate array with the JSON frequency values to test against
$.fn.loadTuningData = function() {
var	i, j;

	for (i = 0, j = 0; i <= stdTuning.length - 1, j <= pythaTuning.length -1; i++, j++) {

		// add note and Frequency values from our JSON objects
		// 440 Hz tuning
		stdTuningNotes.push(stdTuning[i].Note);
		stdTuningFreq.push(stdTuning[i].Frequency);

		// 432 Hz tuning
		pythaTuningNotes.push(pythagoreanTuning[j].Note);
		pythaTuningFreq.push(pythagoreanTuning[j].Frequency);

	}	

	// set the octave slices
	midOctave 	= stdTuningNotes.slice(48, 60);
	lowOctave 	= stdTuningNotes.slice(36, 48);
	highOctave 	= stdTuningNotes.slice(60, 72);

	midFreq 	= stdTuningFreq.slice(48, 60);
	lowFreq 	= stdTuningFreq.slice(36, 48);
	highFreq 	= stdTuningFreq.slice(60, 72);
	
	// log output
	console.log("standardTuning notes: " + stdTuningNotes[48] +" succesfully loaded" + "\n" + 
		"standardTuning freq: " + stdTuningFreq[48] +" succesfully loaded" + "\n" +
		"pythagoreanTuning notes: " + pythaTuningNotes[48] +" succesfully loaded" + "\n" +
		"pythagoreanTuning freq: " + pythaTuningFreq[48] + " succesfully loaded" + "\n");
}

var sequencer = new Nexus.Sequencer('#sequencer',{
 'size': [350,80],
 'mode': 'toggle',
 'rows': 4,
 'columns': 16
});


var seqValue = [],
	cell = [3],
	freq_1,
	note_1;

$.fn.getNoteFrequency = function() {

	for (var i = 0; i <= stdTuning.length; i++) {

		if (stdTuning[i].Note == note_1) {
			freq_1 = parseFloat(stdTuning[i].Frequency);
			note_1 = stdTuning[i].Note;

			console.log('osc-1 freq: ' + freq_1 + "\n"
						+ 'osc-1 note: ' + note_1);

			return [freq_1, note_1];
		}
	}
}

sequencer.on('step',function(v) {

	var position = sequencer.stepper.value,
		oct;

	if (oscOneOct == 0) {
		oct = "4";
	} else if (oscOneOct == 1) {
		oct = "5";
	} else if (oscOneOct == -1) {
		oct = "3";
	}
	seqValue = v;


	for (var i = 0; i <= 3; i++)
	if (seqValue[i] == 1) {
		if (seqValue[3] == 1) {
			note_1 = "C" + oct;
			$.fn.getNoteFrequency();
			oscOne.triggerAttackRelease(note_1, "16n");
			console.log(note_1);
		}
		if (seqValue[2] == 1) {
			note_1 = "D" + oct;
			$.fn.getNoteFrequency();
			oscOne.triggerAttackRelease(note_1, "16n");
			console.log(note_1);
		}
		if (seqValue[1] == 1) {
			note_1 = "E" + oct;
			$.fn.getNoteFrequency();
			oscOne.triggerAttackRelease(note_1, "16n");		
			console.log(note_1);
		}
		if (seqValue[0] == 1) {
			note_1 = "F" + oct;
			$.fn.getNoteFrequency();
			oscOne.triggerAttackRelease(note_1, "16n");
			console.log(note_1);
		}

		console.log('match: ' + note_1 + ' cellno: ' + position);
	}

	console.log('col: ' + v + ' count: ' + position);
});
