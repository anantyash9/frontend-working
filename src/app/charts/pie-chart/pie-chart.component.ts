import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { QuarkusService } from 'src/app/services/quarkus/quarkus.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: { position: 'bottom' },
  };
  public pieChartLabels: Label[] = [['Auth Passed'], ['Auth Failed']];
  public pieChartData: SingleDataSet = [1, 1];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array < any > = [{
    backgroundColor: ['#3f3fbf','#b32235']
  }];

  constructor( private quarkusService: QuarkusService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.quarkusService.getAnalytics().subscribe(data => {
    var pass=data.totalAuth
    var fail=data.totalAuthFailure
    this.pieChartData = [pass, fail];
  })
}

  ngOnInit() {
  }
}
