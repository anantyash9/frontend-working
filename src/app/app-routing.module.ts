import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from '../app/components/landing/landing.component';
// import {InterviewSelectionComponent} from '../app/components/interview-selection/interview-selection.component';
// import {IntroComponent} from '../app/components/intro/intro.component';
// import {OutroComponent} from '../app/components/outro/outro.component';
// import {InterviewQuestionComponent} from '../app/components/interview-question/interview-question.component';
// import {InterviewResultComponent} from '../app/components/interview-result/interview-result.component'
// import {InterviewdetailsComponent} from '../app/components/interviewdetails/interviewdetails.component'
import { RegisterComponent } from './components/register/register.component';
import { CaptureComponent } from './components/capture/capture.component';
import { AttendenceViewComponent } from './components/attendence-view/attendence-view.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import {HrAdminComponent} from './components/hr-admin/hr-admin.component';
import { HrSummaryComponent } from './components/hr-summary/hr-summary.component';
import { UserAttendenceViewComponent } from './components/user-attendence-view/user-attendence-view.component';
import { SummaryPannelComponent } from './components/summary-pannel/summary-pannel.component';


const routes: Routes = [{ path: '', component: LandingComponent },
{ path: 'hr-summary', component: HrSummaryComponent },
{ path: 'hr-admin', component: HrAdminComponent },
{ path: 'admin', component: AdminViewComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'capture', component: CaptureComponent },
{ path: 'attendence', component: AttendenceViewComponent },
{ path: 'user-attendence', component: UserAttendenceViewComponent },
{ path: 'summary-pannel', component: SummaryPannelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
