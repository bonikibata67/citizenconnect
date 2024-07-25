import {  Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewComponent } from './views/views.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { PollsComponent } from './polls/polls.component';
import { AuthGuard } from './guard/auth.guard';
// import { AiChatComponent } from './ai-chat/ai-chat.component';
import { ReportIncidentComponent } from './report-incident/report-incident.component';
import { EducateComponent } from './educate/educate.component';
import { GovernmentDashboardComponent } from './government-dashboard/government-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { OfficialComponent } from './official/official.component';
import { AdminGuard } from './guard/admin.guard';
import { GovernmentGuard } from './guard/government.guard';
import { CitizenGuard } from './guard/citizen.guard';
import { CreatepollComponent } from './createpoll/createpoll.component';
import { AisummaryComimplements } from './aisummary/aisummary.component';




const routes: Routes = [
  {path:'',redirectTo: '/home',pathMatch:'full'},
  { path: 'home', component: HomeComponent,  },
   {path:'login',component:LoginComponent},
  {path: 'signup',component:SignupComponent},
  { path: 'views', component: ViewComponent},
  { path: 'polls', component: PollsComponent},  
  { path: 'ReportIncident', component: ReportIncidentComponent, },  
  { path: 'educate', component: EducateComponent},  
  { path: 'incidents', component: IncidentsComponent, },
  {path: 'admin', component: AdminDashboardComponent},
  {path: 'government', component: GovernmentDashboardComponent, canActivate: [GovernmentGuard]},
  { path: 'createpoll', component: CreatepollComponent },
  { path: 'Aisummary', component: AisummaryComimplements},
  { path: '**', redirectTo: 'login' }
  
];

export default routes;
