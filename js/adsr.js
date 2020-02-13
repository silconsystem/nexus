/*          adsr.js             */
/*
var attack_1    = new Nexus.Slider("#attack-one"),
    decay_1     = new Nexus.Slider("#decay-one"),
    sustain_1   = new Nexus.Slider("#sustain-one"),
    release_1   = new Nexus.Slider("#release-one");

attack_1.on('change',function(v) {

});

decay_1 .on('change',function(v) {
    
});

sustain_1.on('change',function(v) {
    
});

release_1.on('change',function(v) {
    
});
*/
//an amplitude envelope
var envOne = new Tone.AmplitudeEnvelope();

var att_1,
    dec_1,
    sus_1,
    rel_1;

var env_1 = new Nexus.Envelope("#envelope-one", {
    'size': [300,150],
    'noNewPoints': false,
    'points': [
      {
        x: 0.1,
        y: 0.4
      },
      {
        x: 0.35,
        y: 0.6
      },
      {
        x: 0.65,
        y: 0.2
      },
      {
        x: 0.9,
        y: 0.4
      },
    ]
  });

  env_1.on('change',function(v) {

    att_1 = env_1.points[0].y;
    dec_1 = env_1.points[1].y;
    sus_1 = env_1.points[2].y;
    rel_1 = env_1.points[3].y;

    envOne.attack   = Math.round(att_1 * 10) / 10;
    envOne.decay    = Math.round(dec_1 * 10) / 10;
    envOne.sustain  = Math.round(sus_1 * 10) / 10;
    envOne.release  = Math.round(rel_1 * 10) / 10;

    console.log(v);
  })