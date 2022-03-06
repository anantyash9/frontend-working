import { Component, Input, OnInit } from '@angular/core';
import { Result} from 'src/app/models/result.model';
@Component({
  selector: 'app-interviewcard',
  templateUrl: './interviewcard.component.html',
  styleUrls: ['./interviewcard.component.css']
})
export class InterviewcardComponent implements OnInit {

  @Input()
  result: Result

  avgScore;
  avgDifficulty;
  status;

  constructor() {}

  ngOnInit(): void {
    this.avgScore=(this.result.netScore/this.result.netWeight).toFixed(1);
    this.avgDifficulty=(this.result.netWeight/this.result.netQuestions).toFixed(1);
    if (this.result.active==true)
    {
      this.status="In Progress";
    }
    else
    {this.status="Completed"}
  }

}
