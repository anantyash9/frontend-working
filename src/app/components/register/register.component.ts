import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuarkusService } from 'src/app/services/quarkus/quarkus.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public innerWidth: any;
  public innerHeight: any;
  public color: any;
  constructor(private router:Router,private quarkusService:QuarkusService) { }
  isRegistered:boolean=false;
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.color = "#383838";
    this.quarkusService.getProfile().subscribe(data=>{
      if (data!=null){
        console.log("data is not null");
        this.isRegistered=true;
        this.router.navigate(['/attendence']);
      }
    });
  }

}
