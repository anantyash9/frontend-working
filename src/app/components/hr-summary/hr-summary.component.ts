import { Component, OnInit } from '@angular/core';
import { QuarkusService } from 'src/app/services/quarkus/quarkus.service';
@Component({
  selector: 'app-hr-summary',
  templateUrl: './hr-summary.component.html',
  styleUrls: ['./hr-summary.component.css']
})
export class HrSummaryComponent implements OnInit {
  number: any = 0;
  data: any;
  constructor( private quarkusService: QuarkusService) {
    this.quarkusService.getAnalytics().subscribe(data => {
      console.log(data);
      this.data = data;
    })
   }

  ngOnInit(): void {
  }

}
