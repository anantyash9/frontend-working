import { HighContrastMode } from '@angular/cdk/a11y';
import { Component, Input, OnInit } from '@angular/core';
import SiriWave from "siriwave";


@Component({
  selector: 'app-wave',
  templateUrl: './wave.component.html',
  styleUrls: ['./wave.component.css']
})
export class WaveComponent implements OnInit {
  @Input() color: string;
  @Input() hight: number;
  @Input() width: number;
  @Input() lineWidth: number;

  constructor() { }

  ngOnInit(): void {
    this.run()
  }
  run() {
    var taskHandle = 0;
    var spectrum, dBASpectrum;
    var source = undefined;
    // A-weighting
  // https://www.softdb.com/difference-between-db-dba/
  // https://en.wikipedia.org/wiki/A-weighting
  var RA = f => 
  12194 ** 2 * f ** 4 /
  ((f ** 2 + 20.6 ** 2) * Math.sqrt((f ** 2 + 107.7 ** 2) * (f ** 2 + 737.9 ** 2)) * (f ** 2 + 12194 ** 2)),
A = f => 20 * Math.log10(RA(f)) + 2.0;

    var siriWave = new SiriWave({
      container: document.getElementById("siri-container"),
      cover: true,
      width: this.width,
      height: this.hight,
      color: this.color,
      curveDefinition:[
        {
          attenuation: -2,
          lineWidth: this.lineWidth,
          opacity: 0.1,
        },
        {
          attenuation: -6,
          lineWidth: this.lineWidth*1.5,
          opacity: 0.2,
        },
        {
          attenuation: 4,
          lineWidth: this.lineWidth*1.5,
          opacity: 0.4,
        },
        {
          attenuation: 2,
          lineWidth: this.lineWidth*1.5,
          opacity: 0.6,
        },
        {
          attenuation: 1,
          lineWidth: this.lineWidth*1.5,
          opacity: 1,
        },
      ]
    });
    const audioStream =
      navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  
    // Note that the visualisation itself is animated with fps_ani = 60 Hz ↷ interval_ani = 17 msec
    // ν
    const approxVisualisationUpdateFrequency = 20;
    // total sample time T = 1 / ν
    // sampling rate f
    // total number of samples N = f ∙ T
  
    audioStream
    .then(stream => Promise.all([stream, navigator.mediaDevices.enumerateDevices()]))
    .then(([stream, devices]) => {
      //context depending on browser(Chrome/Firefox)
      let context = new (window['AudioContext'] || window['webkitAudioContext'])();
      //create source for sound input.
      source = context.createMediaStreamSource(stream);
      //create analyser node.
      let analyser = context.createAnalyser();
  
      const 
        trackSettings = stream.getAudioTracks()[0].getSettings(),
        sampleRate = trackSettings.sampleRate || context.sampleRate, // Firefox does not support trackSettings.sampleRate
        deviceName = devices.find(device => device.deviceId === trackSettings.deviceId).label;
  
      console.log(`sample rate: ${sampleRate} Hz, 
      audio context sample rate: ${context.sampleRate} Hz,
      dynamic: ${trackSettings.sampleSize} bit
      device: ${deviceName}`);
  
      let totalNumberOfSamples = 
        sampleRate / approxVisualisationUpdateFrequency; // e.g. 48000 / 5 = 9600
  
      analyser.fftSize = 2 ** Math.floor(Math.log2(totalNumberOfSamples));
  
      const 
        uint8TodB = byteLevel => 
          (byteLevel / 255) * (analyser.maxDecibels - analyser.minDecibels) + analyser.minDecibels;
  
      console.log(`frequency bins: ${analyser.frequencyBinCount}`);
  
      const
        weightings = [-100];
      for (let i = 1; i < analyser.frequencyBinCount; i++) {
        weightings[i] = A(i * sampleRate / 2 / analyser.frequencyBinCount);
      }
  
      //array for frequency data.
      // holds Number.NEGATIVE_INFINITY, [0 = -100dB, ..., 255 = -30 dB]
      spectrum = new Uint8Array(analyser.frequencyBinCount);
      dBASpectrum = new Float32Array(analyser.frequencyBinCount);
  
      let waveForm = new Uint8Array(analyser.frequencyBinCount);
  
      //connect source->analyser->destination.
      source.connect(analyser);
      // noisy feedback loop if we put the mic on the speakers 
      //analyser.connect(context.destination);
  
      siriWave.start();
  
      const updateAnimation = function (idleDeadline) {
        taskHandle = requestAnimationFrame(updateAnimation);
  
        //copy frequency data to spectrum from analyser.
        // holds Number.NEGATIVE_INFINITY, [0 = -100dB, ..., 255 = -30 dB]
        analyser.getByteFrequencyData(spectrum);
  
        spectrum.forEach((byteLevel, idx) => {
          dBASpectrum[idx] = uint8TodB(byteLevel) + weightings[idx];
        });
  
        const 
          highestPerceptibleFrequencyBin =
            dBASpectrum.reduce((acc, y, idx) => y > -90 ? idx : acc, 0),
          // S = ∑ s_i
          totaldBAPower =
            dBASpectrum.reduce((acc, y) => acc + y),
  
          // s⍉ = ∑ s_i ∙ i / ∑ s_i
          meanFrequencyBin =
            dBASpectrum.reduce((acc, y, idx) => acc + y * idx) / totaldBAPower,
  
          highestPowerBin = 
            dBASpectrum.reduce(([maxPower, iMax], y, idx) => 
              y > maxPower ? [y, idx] : [maxPower, iMax], [-120, 0]
            )[1],
            
          highestDetectedFrequency = 
            highestPerceptibleFrequencyBin * (sampleRate / 2 / analyser.frequencyBinCount),
          meanFrequency = 
            meanFrequencyBin * (sampleRate / 2 / analyser.frequencyBinCount),
          maxPowerFrequency = 
            highestPowerBin * (sampleRate / 2 / analyser.frequencyBinCount);
  
        //set the speed for siriwave
        // scaled to [0..22kHz] -> [0..1]
        siriWave.setSpeed(maxPowerFrequency / 10e+3);
        
        const averagedBAPower = 
          totaldBAPower / analyser.frequencyBinCount;
  
        // for fun use raf to update the screen
        // requestAnimationFrame(() => {
        //   energyElement.textContent = averagedBAPower.toFixed(2);
        //   frequencyElement.textContent = highestDetectedFrequency.toFixed(0);
        //   meanFrequencyElement.textContent = meanFrequency.toFixed(0);
        //   maxPowerElement.textContent = maxPowerFrequency.toFixed(0);
        // });
  
        //find the max amplituded
        // the zero level is at 128
        analyser.getByteTimeDomainData(waveForm);
  
        // find the maximum not considering negative values (without loss of generality)
        const amplitude = waveForm.reduce((acc, y) => Math.max(acc, y), 128) - 128;
  
        //scale amplituded from [0, 128] to [0, 10].
        siriWave.setAmplitude((amplitude / 128 * 10)/5);
      };
  
      taskHandle =requestAnimationFrame(updateAnimation);
    });
  }
}
