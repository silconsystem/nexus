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

/*

$.fn.setOctave = function() {

	// get value from octave range and set array of notes to use
	switch (oscOneOct) {

		// fill activeNoteValue & activeNoteValue
		case "0":
			o1_Freq.min 	= midFreq[0];
			o1_Freq.max 	= midFreq[11];
			activeFreqValue = midFreq;
			activeNoteValue = midOctave;

			break;

		case "1":
			o1_Freq.min 	= highFreq[0];
			o1_Freq.max 	= highFreq[11];
			activeFreqValue = highFreq;
			activeNoteValue = highOctave;

			break;

		case "-1":
			o1_Freq.min 	= lowFreq[0];
			o1_Freq.max 	= lowFreq[11];
			activeFreqValue = lowFreq;
			activeNoteValue = lowOctave;		
			
			break;
	}
	//console.log('frequency values set from: ' + activeFreqValue[0] + 'to: ' + activeFreqValue[11]);
}*/

var sequencer = new Nexus.Sequencer('#sequencer',{
 'size': [350,80],
 'mode': 'toggle',
 'rows': 4,
 'columns': 16
});

// handler functions
$.fn.getMatrixValues = function() {

	// set variables for easy acces
	row_1 = Object.values(sequencer.matrix.pattern[0]);
	row_2 = Object.values(sequencer.matrix.pattern[1]);
	row_3 = Object.values(sequencer.matrix.pattern[2]);
	row_4 = Object.values(sequencer.matrix.pattern[3]);

  console.log('seq_1: ' + row_1 + "\n" +
  				'seq_2' + row_2 + "\n" +
  				'seq_3' + row_3 + "\n" +
  				'seq_4' + row_4);
}
var seqValue = [],
	note,
	cell = [3],
	freq_1;

$.fn.getNoteFrequency = function() {

	for (var i = 0; i <= stdTuning.length; i++) {

		if (stdTuning[i].Note == note) {
			freq_1 = stdTuning[i].Frequency;

			console.log('osc-1 freq: ' + freq_1);

			return freq_1;
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
			note = "C" + oct;
			$.fn.getNoteFrequency();
			oscOne.frequency.value = freq_1;
			oscOne.start().stop("+0.5");
			console.log(note);
		}
		if (seqValue[2] == 1) {
			note = "D" + oct;
			$.fn.getNoteFrequency();
			oscOne.frequency.value = freq_1;
			oscOne.start().stop("+0.5");
			console.log(note);
		}
		if (seqValue[1] == 1) {
			note = "E" + oct;
			$.fn.getNoteFrequency();
			oscOne.frequency.value = freq_1;
			oscOne.start().stop("+0.5");		
			console.log(note);
		}
		if (seqValue[0] == 1) {
			note = "F" + oct;
			$.fn.getNoteFrequency();
			oscOne.frequency.value = freq_1;
			oscOne.start().stop("+0.5");
			console.log(note);
		}

		console.log('match: ' + note + ' cellno: ' + position);
	}

	console.log('col: ' + v + ' count: ' + position);

	if (position == 15) {
		$.fn.getMatrixValues();
	}
});
