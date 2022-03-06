import { Component, OnInit } from '@angular/core';
import { QuarkusService } from 'src/app/services/quarkus/quarkus.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-summary-pannel',
  templateUrl: './summary-pannel.component.html',
  styleUrls: ['./summary-pannel.component.css']
})
export class SummaryPannelComponent implements OnInit {
  number: any = 0;
  data: any;
  constructor(private quarkusService: QuarkusService) {
    this.quarkusService.getAnalytics().subscribe(data => {
      console.log(data);
      this.data = data;
    })
   }
  

  ngOnInit(): void {
    
  }

}
