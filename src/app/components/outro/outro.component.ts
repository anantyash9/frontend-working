import { Component, OnInit, OnDestroy,HostListener  } from '@angular/core';
import {InterviewService} from '../../services/interview.service'
import {KeycloakService} from 'keycloak-angular'
import { IoService } from '../../services/io.service';
import {EventService} from '../../services/event.service'
import { Router} from '@angular/router';
import { TtsComponent} from '../tts/tts.component';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  providers:[TtsComponent],
  selector: 'app-outro',
  templateUrl: './outro.component.html',
  styleUrls: ['./outro.component.css']
})
export class OutroComponent implements OnInit {
  color="#d90202"
  heading;
  subheading;
  subscription;
  name;
  public innerWidth: any;
  public innerHeight: any;
  loaded=false;

  constructor(public interviewservice:InterviewService, public keycloakservice:KeycloakService,public ioService: IoService,public eventService:EventService,private router: Router,public tts: TtsComponent) 
  { this.keycloakservice.loadUserProfile().then(data=>{this.heading="Thats it "+data.firstName +" !"; this.name =data.firstName; } )}

  ngOnInit(): void {
    if (!isDefined(this.interviewservice.questionset))
    {console.log('navigating out')
      this.router.navigate([''])}
    else{
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.subheading="Thanks for taking the interview for  "+this.interviewservice.questionset.name
    let text=this.interviewservice.questionset.outro.replace(/#named#/gi,this.name );
    this.ioService.sendMessage('tts', { text:text,audio:{language:''} });
    this.ioService.socket.on('audio',()=>{this.loaded=true;})
    this.tts.ngAfterViewInit()
  }
  }
  start(){
    this.tts.stopOutput();
    this.router.navigate(['']);
  }
  @HostListener('unloaded')
  ngOnDestroy() {
    try{
    this.tts.stopOutput()
    }
    catch{console.log('couldent close tts properly')}
    window.location.reload();
  }
}