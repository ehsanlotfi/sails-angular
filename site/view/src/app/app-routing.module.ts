import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { LoginComponent } from './components/login/login.component';
import { ActivityComponent } from './components/activity/activity.component';
import { IEComponent } from './components/IE/ie.component';
import { DocumentComponent } from './components/document/document.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { Page404Component } from './components/page-404/page-404.component';
import { ReportComponent } from './components/report/report.component';
import { SalaryComponent } from './components/salary/salary.component';

const app: Routes = [
  { path :'users' , component : UsersComponent },
  { path :'tasks/:id' , component : TasksComponent },
  { path :'activity' , component : ActivityComponent },
  { path :'ie' , component : IEComponent },
  { path :'document' , component : DocumentComponent },
  { path :'report' , component : ReportComponent },
  { path :'salary' , component : SalaryComponent }
];

const routes: Routes = [
  { path : '' , redirectTo : 'login' , pathMatch :'full' },
  { path :'login' , component : LoginComponent },
  { path :'app' , component : AppLayoutComponent,  children: app },
  { path :'**' , component : Page404Component }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
