import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './components/users/users.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import { Router } from "@angular/router";
import { ActivityComponent } from './components/activity/activity.component';
import { IEComponent } from './components/IE/ie.component';
import { DocumentComponent } from './components/document/document.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { Page404Component } from './components/page-404/page-404.component';

@Component({
selector : 'app-root',
templateUrl: 'master.html'
})
class AppComponent {
  constructor(private router: Router){ }
}

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TasksComponent,
    LoginComponent,
    ActivityComponent,
    IEComponent,
    DocumentComponent,
    AppLayoutComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DpDatePickerModule
  ],
  providers: [ ApiService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
