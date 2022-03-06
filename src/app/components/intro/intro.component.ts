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
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit , OnDestroy {
  color="#d90202"
  heading;
  subheading;
  name;
  loaded=false;
  public innerWidth: any;
  public innerHeight: any;
  
  constructor(public interviewservice:InterviewService, public keycloakservice:KeycloakService,public ioService: IoService,public eventService:EventService,private router: Router,public tts: TtsComponent) {this.keycloakservice.loadUserProfile().then(data=>{this.heading="Hi "+data.firstName; this.name =data.firstName; } ) }

  ngOnInit(): void {
    if (!isDefined(this.interviewservice.questionset))
    {console.log('navigating out')
      this.router.navigate([''])}
    else{
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.subheading="This is an interview for "+this.interviewservice.questionset.name
    let text=this.interviewservice.questionset.intro.replace(/#named#/gi, this.name);
    this.ioService.sendMessage('tts', { text:text,audio:{language:''} });
    this.ioService.socket.on('audio',()=>{this.loaded=true;})
    this.tts.ngAfterViewInit()
  
    }
  }
  start(){
    try{this.tts.stopOutput();}
    catch{}
    
    this.router.navigate(['/interviewquestion'])
  }
  @HostListener('unloaded')
  ngOnDestroy() {
    try{
      this.tts.stopOutput()
    }
    catch{}
  }
}
