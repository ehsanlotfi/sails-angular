import { Component, OnInit } from '@angular/core';
import { ApiService, Task, Activity } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent extends Auth  implements OnInit {

  tasks: Task[];
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
    this.activatedRoute.params.subscribe(params => {
      if(params && params.id){
          this.userId = params.id;
          this.api.getAllActivitys().subscribe((res: Activity[])=>{
            this.activitys = res;
          })
      } else {
        this.router.navigate(['/users'])
      }
  });
    this.resetTask();
    this.getAllTasks();
  }

  getAllTasks(){
    this.api.getAllTasks().subscribe((res:Task[])=>{
      this.tasks = res;
      
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
