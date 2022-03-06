import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MicrophoneComponent } from './components/microphone/microphone.component';
// import { IoService } from './services/io.service';
// import { InterviewService} from './services/interview.service';
// import { EventService} from './services/event.service';
// import { TtsComponent } from './components/tts/tts.component';
// import { WaveComponent } from './components/wave/wave.component';
import {DemoMaterialModule} from './material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LandingComponent } from './components/landing/landing.component';
import { environment } from "src/environments/environment";
import { KeycloakService, KeycloakAngularModule } from "keycloak-angular";
import {KeyInitService} from "../app/services/key-init.service";
import { NavbarComponent } from './components/navbar/navbar.component';
// import { InterviewSelectionComponent } from './components/interview-selection/interview-selection.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { IntroComponent } from './components/intro/intro.component';
// import { InterviewQuestionComponent } from './components/interview-question/interview-question.component';
// import { OutroComponent } from './components/outro/outro.component';
// import { InterviewResultComponent } from './components/interview-result/interview-result.component';
// import { InterviewcardComponent } from './components/interviewcard/interviewcard.component';
// import {InterviewdetailsComponent} from '../app/components/interviewdetails/interviewdetails.component';
import { RegisterComponent } from './components/register/register.component';
import { CaptureComponent } from './components/capture/capture.component';
import { AttendenceViewComponent } from './components/attendence-view/attendence-view.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import {DevicesViewComponent} from './components/devices-view/devices-view';
import { AddDeviceComponent } from './components/add-device/add-device.component';
import {EditDeviceComponent} from './components/edit-device/edit-device.component';
import { ConfirmDialogueComponent } from './components/confirm-dialogue/confirm-dialogue.component';
import { SummaryPannelComponent } from './components/summary-pannel/summary-pannel.component';
import { QuarkusService } from './services/quarkus/quarkus.service';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { HrAdminComponent } from './components/hr-admin/hr-admin.component';
import { HrSummaryComponent } from './components/hr-summary/hr-summary.component';
import { RegisteredUsersViewComponent } from './components/registered-users-view/registered-users-view.component';
import { UserAttendenceViewComponent } from './components/user-attendence-view/user-attendence-view.component';
import { MenuComponent } from './components/menu/menu.component';
import {StyleManagerService} from './services/style-manager.service';
import {ThemeService} from './services/theme.service';
function initializeKeycloak(keycloak: KeycloakService) {
  // const keycloak = new KeycloakService();
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.issuer,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      enableBearerInterceptor: true,
      loadUserProfileAtStartUp: true,
      initOptions: {
        onLoad: "login-required",
        checkLoginIframe: false,
      },bearerPrefix: 'Bearer',
      bearerExcludedUrls: ['/similarity'],
    });
}

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    RegisterComponent,
    CaptureComponent,
    AttendenceViewComponent,
    AdminViewComponent,
    DevicesViewComponent,
    AddDeviceComponent,
    EditDeviceComponent,
    ConfirmDialogueComponent,
    SummaryPannelComponent,
    PieChartComponent,
    HrAdminComponent,
    HrSummaryComponent,
    RegisteredUsersViewComponent,
    UserAttendenceViewComponent,
    MenuComponent
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FlexLayoutModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    
  ],
  exports:[CaptureComponent],
  providers: [ 
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true,
    },
    QuarkusService,
    KeyInitService,
    StyleManagerService,
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
