import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { LoginComponent } from './components/login/login.component';
import { ActivityComponent } from './components/activity/activity.component';
import { IEComponent } from './components/IE/ie.component';
import { DocumentComponent } from './components/document/document.component';

const routes: Routes = [
  { path :'' ,redirectTo : 'users' , pathMatch :'full' },
  { path :'users' , component : UsersComponent },
  { path :'tasks/:id' , component : TasksComponent },
  { path :'activity' , component : ActivityComponent },
  { path :'login' , component : LoginComponent },
  { path :'ie' , component : IEComponent },
  { path :'document' , component : DocumentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
