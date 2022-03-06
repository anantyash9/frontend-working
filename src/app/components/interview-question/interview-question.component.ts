import { Component, OnInit, OnDestroy,HostListener } from '@angular/core';
import {InterviewService} from '../../services/interview.service'
import {KeycloakService} from 'keycloak-angular'
import { IoService } from '../../services/io.service';
import {EventService} from '../../services/event.service'
import { MicrophoneComponent } from '../microphone/microphone.component';
import { Router} from '@angular/router';
import {TtsComponent} from '../tts/tts.component'
import { isDefined } from '@angular/compiler/src/util';

@Component({
  providers: [MicrophoneComponent,TtsComponent],
  selector: 'app-interview-question',
  templateUrl: './interview-question.component.html',
  styleUrls: ['./interview-question.component.css']
})
export class InterviewQuestionComponent implements OnInit {
  color="#d90202"
  heading=''
  subheading=''
  dataloaded=false
  subscription;
  text='';
  question;
  score;
  questionid;
  isRecording=false;
  public innerWidth: any;
  public innerHeight: any;

  constructor(private router: Router,public interviewservice:InterviewService, public keycloakservice:KeycloakService,public ioService: IoService,public eventService:EventService,public microphone: MicrophoneComponent, public tts: TtsComponent) 
  { if (isDefined(this.interviewservice.questionset)){
    let me =this;
    this.ioService.receiveStream('transcript', function(transcript) {
     console.log(transcript);
     me.text+=" "+transcript;
   }); 
  }
   }

  ngOnInit(): void {
    if (!isDefined(this.interviewservice.questionset))
    {console.log('navigating out')
      this.router.navigate([''])}
    else{

    this.isRecording=false;
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.dataloaded=false
    this.subscription=undefined;
    this.text='';
    this.question=undefined;
    this.score=undefined;
    this.questionid=undefined;
    this.heading=this.interviewservice.questionset.name+' Interview' ;

    this.tts.ngAfterViewInit();
    this.interviewservice.getCurrentQuestion().subscribe(data=>{
      let me =this
      console.log(data)
      if(data.status==200){
      this.questionid=data.body.id
      this.subheading=data.body.question.question;
      this.question=data.body.question;
      this.dataloaded=true;
      this.ioService.sendMessage('tts', { text:this.subheading,audio:{language:''} });
      this.subscription= this.eventService.audioStopping.subscribe(() => {
        if (!this.isRecording){
        console.log("audio stopped playing")
        this.microphone.onStart(data.body.question.answer.split(' '))
        this.isRecording=true;
        }
        else{
          "audio is already recording"
        }
      });


      }
      
    },error=>{this.router.navigate(['/interviewoutro'])});

  }
  }
  next(){
    this.tts.stopOutput();
    this.microphone.onStop();
    try{
    this.subscription.unsubscribe();
    }
    catch{console.log('could not unsub properly')}
    // if answer is empty score is zero

    if (!this.text.replace(/\s/g, '').length) 
    {
      this.score=0;
      this.interviewservice.updateScore(Number(this.score),this.text,this.questionid).subscribe(()=>{ this.ngOnInit()})
    }
    else{
    this.interviewservice.getsimilarity(this.question.answer,this.text).subscribe(data=>{
      this.score=data.score;
      this.interviewservice.updateScore(Number(this.score),this.text,this.questionid).subscribe(()=>{ this.ngOnInit()})
    });
  }
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    this.tts.stopOutput()
    this.microphone.onStop();
    try{
    this.subscription.unsubscribe();
    }
    catch{console.log('could not unsub properly')}
  }

}
