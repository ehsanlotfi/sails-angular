import { Component, OnInit } from '@angular/core';
import { ApiService, Activity } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent extends Auth  implements OnInit {

  activitys: Activity[];
  activity: Activity;

  constructor(
    public api: ApiService, 
    public router: Router,
    public activatedRoute: ActivatedRoute) {
      super(api, router);
    }
   
    
  resetActivity(){
    this.activity = {
      id: -1,
      name: '',
      value: ''
    }
  }

  ngOnInit() {
    this.resetActivity();
    this.getAllActivitys();
  }

  getAllActivitys(){
    this.api.getAllActivitys().subscribe((res:Activity[])=>{
      this.activitys = res;
      
    })
  }

  save(){
    const body: Activity = {
      id : this.activity.id,
      name : this.activity.name,
      value : this.activity.value,
    }
    if(this.activity.id === -1){
      delete body.id;
      this.api.insertActivity(body).subscribe((res)=>{
        this.getAllActivitys();
      });
    } else {
      this.api.updateActivity(body).subscribe((res)=>{
        this.getAllActivitys();
      });
    }
    this.resetActivity();
  }

    delete(id){
      this.api.deleteActivity(id).subscribe((res)=>{
        this.getAllActivitys();
      });
    }

    edit(activity: Activity){
      this.activity = {
        id: activity.id,
        name: activity.name,
        value: activity.value,
      }
    }
}
