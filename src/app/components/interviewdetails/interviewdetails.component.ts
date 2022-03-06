import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
import { Result } from 'src/app/models/result.model';
import { InterviewService } from '../../services/interview.service';
import { element } from 'protractor';
import { isDefined } from '@angular/compiler/src/util';


@Component({
  selector: 'app-interviewdetails',
  templateUrl: './interviewdetails.component.html',
  styleUrls: ['./interviewdetails.component.css']
})


export class InterviewdetailsComponent implements OnInit {
  avgScore;
  avgDifficulty;
  status;
  result : Result;
  details;
  taglist=[];
  tagcard=[]
  constructor(public interviewservice: InterviewService, private router: Router,private _location: Location) { }

  ngOnInit(): void {
    this.result=this.interviewservice.result;

    this.details=this.interviewservice.resultdetails.filter((element)=>{return isDefined(element.interviewQuestion.score)});;
    console.log(this.details)
    this.avgScore=(this.result.netScore/this.result.netWeight).toFixed(1);
    this.avgDifficulty=(this.result.netWeight/this.result.netQuestions).toFixed(1);
    if (this.result.active==true)
    {
      this.status="In Progress";
    }
    else
    {this.status="Completed"}

   this.details.forEach(element => {
     let temp={score:element.interviewQuestion.score, tag:undefined}
    element.questionTags.forEach(tag => {
      temp.tag= tag.qtag.name
    });
    this.taglist.push(temp);
   });
  let uniqueTags=this.taglist.map(item => item.tag)
  .filter((value, index, self) => self.indexOf(value) === index)

  uniqueTags.forEach(tag=>{
    let temp={score:0, tag:tag, count:0}
    this.taglist.forEach(answer=>{
      if(answer.tag==tag){
        temp.score=temp.score+answer.score;
        temp.count+=1
      }

    })
    this.tagcard.push(temp)
  })

    }
}
