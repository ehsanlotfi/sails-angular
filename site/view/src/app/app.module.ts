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
    ActivityComponent
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
