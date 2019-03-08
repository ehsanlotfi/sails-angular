import { Component, OnInit } from '@angular/core';
import { ApiService, Task, Activity, IE, Document } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import * as moment from 'jalali-moment';
import { Auth } from '../auth';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent extends Auth  implements OnInit {

  tasks: any[];
  task: Task;
  activitys: Activity[];
  userId;

  constructor(
    public api: ApiService, 
    public router: Router,
    public activatedRoute: ActivatedRoute) {
      super(api, router);
     }

   
  resetTask(){
    this.task = {
      id: -1,
      desc: '',
      date : '',
      user: null,
      activity: []
    }
  }

  ngOnInit() {
    this.resetTask();
    this.getAllTasks();
  }

  getAllTasks(){
    forkJoin(
      this.api.getAllIEByUserID(+this.api.loginId),
      this.api.getAllDocumentsByUserID(+this.api.loginId)
    ).subscribe(([ies ,docs]:[ any ,any ])=> {
      var dt = moment;
      docs.map((f: any) => {
        const ie = ies.filter((e: any)=>
        dt(e.createdAt).format("MM/DD/YYYY") === dt(f.createdAt).format("MM/DD/YYYY"))[0];
        if(ie){
          f.entryTime = ie.entryTime;
          f.exitTime = ie.exitTime;
        }
          return f;
      });
      this.tasks = docs;
    })
  }

  save(){
    const body: Task = {
      id : this.task.id,
      desc: this.task.desc,
      date: this.task.date,
      user: this.userId,
      activity: this.task.activity
    }
    if(this.task.id === -1){
      delete body.id;
      this.api.insertTask(body).subscribe((res)=>{
        this.getAllTasks();
      });
    } else {
      this.api.updateTask(body).subscribe((res)=>{
        this.getAllTasks();
      });
    }
    this.resetTask();
  }

    delete(id){
      this.api.deleteTask(id).subscribe((res)=>{
        this.getAllTasks();
      });
    }

    edit(Task: Task){
      this.task = {
        id: Task.id,
        desc: Task.desc
      }
    }
}
