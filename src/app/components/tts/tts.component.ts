import { Component,OnInit, AfterViewInit } from '@angular/core';
import { IoService } from '../../services/io.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-tts',
  templateUrl: './tts.component.html',
  styleUrls: ['./tts.component.css']
})
export class TtsComponent implements AfterViewInit {
  public audioContext: AudioContext;
  public outputSource: AudioBufferSourceNode;

  constructor(public ioService: IoService, public eventService: EventService) {
  }

  ngAfterViewInit() {
    let me = this;
    me.audioContext = new AudioContext();

    me.ioService.receiveStream('audio', function(audio) {
      if (audio) {
        console.log("got audio")
        me.playOutput(audio);
      }
    });
    // me.eventService.audioStopping.subscribe(() => {
    //   me.stopOutput();
    // });
    this.textToSpeech()
  }

  textToSpeech() {
    let me = this;
    // iOS Audio hack. - this can only be triggered from a user interaction
    // create empty buffer to warm up
    let b = me.audioContext.createBuffer(1, 1, 22050);
    let tempSource = me.audioContext.createBufferSource();
    tempSource.buffer = b;
    // connect to output (your speakers)
    tempSource.connect(me.audioContext.destination);
    // play the temp file
    tempSource.start(0);
    // now play the returned tts
    // me.eventService.audioPlaying.emit();
    // me.ioService.sendMessage('tts', { text:this.text_me,audio:{language:''} });
  }

  /**
   * When Dialogflow matched an intent,
   * return an audio buffer to play this sound output.
   */
  playOutput(arrayBuffer: ArrayBuffer) {
    let me = this;
    me.eventService.setIsPlaying(true);
    try {
      if (arrayBuffer.byteLength > 0) {
          me.audioContext.decodeAudioData(arrayBuffer,
          function(buffer) {
              me.audioContext.resume();
              me.outputSource = me.audioContext.createBufferSource();
              me.outputSource.buffer = buffer;
              me.outputSource.connect(me.audioContext.destination);
              me.outputSource.start(0);
              me.outputSource.onended = function() {
                // we need the timeout, because of the timeslice in mic.
                setTimeout(function(){ 
                  me.eventService.audioStopping.emit(true)
                  me.eventService.setIsPlaying(false);
                }, 500);
              }
          },
          function() {
              console.log(arguments);
          });
      }
    } catch (e) {
        console.log(e);
    }
  }

  /**
   * Stop audio
   */
  stopOutput() {
    try{
    this.outputSource.disconnect()
    }
    catch{console.log('couldent shut off tts or tts already shut')}
    this.eventService.audioStopping.emit(true)
    this.eventService.setIsPlaying(false);
  }
}
