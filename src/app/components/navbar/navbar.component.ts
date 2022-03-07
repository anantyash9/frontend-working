import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { Option } from 'src/app/models/option.model';
import { UserAttendenceViewComponent } from '../user-attendence-view/user-attendence-view.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();
  admin=false;
  deviceAdmin=false;
  linksys;
  role="USER"
  
  constructor(private keycloak: KeycloakService,private readonly themeService: ThemeService) {
    var roles=keycloak.getUserRoles()
    if (roles.includes("ADMIN")){
      this.admin=true;
      this.linksys=['hr-admin']
      this.role="ADMIN"
      console.log("Admin");
    }
    if (roles.includes("DEVICE-ADMIN")){
      this.deviceAdmin=true;
      this.linksys=['admin']
      this.role="DEVICE-ADMIN"
      console.log("Deviceadmin");
    }
  }

  ngOnInit(): void {
    this.themeService.setTheme("deeppurple-amber");
  }
  logout(){
    console.log("logout called");
    this.keycloak.logout();
  }
  themeChangeHandler(themeToSet) {
    this.themeService.setTheme(themeToSet);
  }

}
