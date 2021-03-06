/*          adsr.js             */

envOne = new Tone.AmplitudeEnvelope();
// control elements
var attack_1    = new Nexus.Slider("#attack-one"),
    decay_1     = new Nexus.Slider("#decay-one"),
    sustain_1   = new Nexus.Slider("#sustain-one"),
    release_1   = new Nexus.Slider("#release-one");

// value display
var att_1_display = $('#att-one-display'),
    dec_1_display = $('#dec-one-display'),
    sus_1_display = $('#sus-one-display'),
    rel_1_display = $('#rel-one-display');

// global variables
var att_1,
    dec_1,
    sus_1,
    rel_1;

// adsr event handlers
attack_1.on('change',function(v) {

  att_1 = Math.round(v * 10) / 10;
  oscOne.envelope.attack = att_1 ;
  att_1_display.html('att: ' + att_1);

  console.log(v);
});
attack_1.min    = 0;
attack_1.max    = 100;
attack_1.value  = 10;
attack_1.step   = 1; 

decay_1 .on('change',function(v) {

  dec_1 = Math.round(v * 10) / 10;
  oscOne.envelope.decay = dec_1;
  dec_1_display.html('dec: ' + dec_1);

  console.log(v);    
});
decay_1.min    = 0;
decay_1.max    = 100;
decay_1.value  = 40;
decay_1.step   = 1;

sustain_1.on('change',function(v) {
  sus_1 = Math.round(v * 10) / 10;
  oscOne.envelope.sustain = sus_1;
  sus_1_display.html('sus: ' + sus_1);

  console.log(v);    
});
sustain_1.min   = 0; 
sustain_1.max   = 100;
sustain_1.value = 30;
sustain_1.step  = 1;

release_1.on('change',function(v) {
  rel_1 = Math.round(v * 10) / 10;
  oscOne.envelope.release = rel_1;
  rel_1_display.html('rel: ' + rel_1);

  console.log(v);    
});
release_1.min   = 0;
release_1.max   = 100;
release_1.value = 40;
release_1.step  = 1;