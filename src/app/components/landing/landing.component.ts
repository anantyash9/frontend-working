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
  linksys=['register']
  constructor(private keycloak:KeycloakService, private router:Router) { 
    var roles=keycloak.getUserRoles()
    if (roles.includes("ADMIN")){
      this.linksys=['hr-admin']
      console.log("Admin");
    }
    if (roles.includes("DEVICE-ADMIN")){
      this.linksys=['admin']
      console.log("Deviceadmin");
    }
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.color = "#383838";
    this.router.navigate(this.linksys);
    
  }
  
}
