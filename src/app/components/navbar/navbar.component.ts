import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();
  Admin=false;
  constructor(private keycloak: KeycloakService,private readonly themeService: ThemeService) { }

  ngOnInit(): void {
    console.log(this.keycloak.getUsername());
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
