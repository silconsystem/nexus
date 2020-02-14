/*          scope.js            */
var oscScope = new Tone.Analyser({
        size : 1024,
        type : "waveform",
        smoothing : 0.8
});