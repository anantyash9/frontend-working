import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public innerWidth: any;
  public innerHeight: any;
  public color: any;
  constructor(private keycloakservice:KeycloakService, private router:Router) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.color = "#383838";
    if (this.keycloakservice.getUserRoles().includes("ADMIN")){
      console.log("admin");
      this.router.navigate(['/admin']);
    }
    else{
      console.log("user");
      this.router.navigate(['/register']);
    }
    
    
  }
  
}
