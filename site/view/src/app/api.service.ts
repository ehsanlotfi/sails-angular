import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BaseHttp =  'http://localhost:1337/';
const apiRouter = {
  users: `${BaseHttp}user`,
  tasks: `${BaseHttp}task`,
  activity: `${BaseHttp}activity`,
};

export interface User {
  id?: number;
  name?: string;
  LastName?: string;
  code?: number;
  pass?: string;
  role?: number;
  tasks?: Task[]
}

export interface Task {
  id?: number;
  desc?: string;
  date?: string;
  activity?: Activity[];
  user?: User;
}

export interface Activity {
  id?: number;
  name?: string,
  value?: string,
  tasks?: Task[]
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  loginId = -1;
  
  constructor(private http: HttpClient) { }

  getAllUsers(){
      return this.http.get(apiRouter.users);
  }

  login(body: User){
    return this.http.get(`${apiRouter.users}?where={"code":"${body.code}","pass":"${body.pass}"}`);
  }
  
  insertUser(body: User){
   return  this.http.post(apiRouter.users, body)
  }

  deleteUser(id){
    return this.http.delete(`${apiRouter.users}/${id}`);
  }

  updateUser(body: User){
    return this.http.put(`${apiRouter.users}/${body.id}`, body);
  }

  getAllTasks(){
    return this.http.get(apiRouter.tasks);
  }

  getAllTasksByUser(){
    return this.http.get(apiRouter.tasks);
  }

  insertTask(body: Task){
  return  this.http.post(apiRouter.tasks, body)
  }

  deleteTask(id){
    return this.http.delete(`${apiRouter.tasks}/${id}`);
  }

  updateTask(body: Task){
    return this.http.put(`${apiRouter.tasks}/${body.id}`, body);
  }


  
  getAllActivitys(){
    return this.http.get(apiRouter.activity);
  }

  getAllActivitysByUser(){
    return this.http.get(apiRouter.activity);
  }

  insertActivity(body: Activity){
  return  this.http.post(apiRouter.activity, body)
  }

  deleteActivity(id){
    return this.http.delete(`${apiRouter.activity}/${id}`);
  }

  updateActivity(body: Activity){
    return this.http.put(`${apiRouter.activity}/${body.id}`, body);
  }




}
