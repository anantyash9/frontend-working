import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../services/interview.service'
import { KeycloakService } from 'keycloak-angular'
import { FormBuilder } from '@angular/forms';
import { Router} from '@angular/router';
import { Result } from 'src/app/models/result.model';
import {InterviewdetailsComponent} from '../interviewdetails/interviewdetails.component';
import {MatDialog} from '@angular/material/dialog';
import { pipe } from 'rxjs';
import { element } from 'protractor';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-interview-result',
  templateUrl: './interview-result.component.html',
  styleUrls: ['./interview-result.component.css']
})
export class InterviewResultComponent implements OnInit {
  loaded = false;
  questionsets = []
  name;
  interviewform;
  fetching=false;
  results:Result[];

  constructor(public interviewservice: InterviewService, private keycloakservice: KeycloakService,private formBuilder: FormBuilder,private router: Router,public dialog: MatDialog)
   {
    this.interviewform=formBuilder.group({
      interview:''
    });

    }

  ngOnInit(): void { 
    this.interviewservice.loadQuestionSets().subscribe(questionsets => { this.questionsets = questionsets; this.loaded = true; })
  }
  onFetch(formvalue){
    this.fetching=true;
    this.interviewservice.getResults(formvalue.interview).subscribe(data=>{
      
      this.results=data.filter((element)=>{return isDefined(element.netQuestions)});
      // console.log(data.filter((element)=>{return isDefined(element.netQuestions)}));
      this.fetching=false;
    })
  }
  showDetails(result:Result){
    this.interviewservice.getResultsDetails(result.id).subscribe(data=>{
      this.interviewservice.resultdetails=data; 
      this.interviewservice.result=result ;
      this.openDialog();
      })
  }
  openDialog() {
    const dialogRef = this.dialog.open(InterviewdetailsComponent, {panelClass: 'full-width-dialog'});
  }
}
