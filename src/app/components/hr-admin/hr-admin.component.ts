import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-admin',
  templateUrl: './hr-admin.component.html',
  styleUrls: ['./hr-admin.component.css']
})
export class HrAdminComponent implements OnInit {
  totalEmployees=100;
  constructor() { }


  ngOnInit(): void {
  }

}
