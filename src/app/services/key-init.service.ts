import { Injectable } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import { environment } from "src/environments/environment";
import { NgModule, APP_INITIALIZER } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyInitService {
  public isIntitalized;

  constructor(private keycloakservice:KeycloakService) { 
      this.isIntitalized=this.initializeKeycloak(keycloakservice)
  }

  private initializeKeycloak(keycloak: KeycloakService) {
    // const keycloak = new KeycloakService();
    return () =>
      keycloak.init({
        config: {
          url: environment.keycloak.issuer,
          realm: environment.keycloak.realm,
          clientId: environment.keycloak.clientId,
        },
        loadUserProfileAtStartUp: true,
        initOptions: {
          onLoad: "login-required",
          checkLoginIframe: false,
        },
        bearerExcludedUrls: [],
      });
  }
}
