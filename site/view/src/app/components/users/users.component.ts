import { Component, OnInit } from '@angular/core';
import { ApiService,User } from '../../api.service';
import { Auth } from '../auth'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends Auth implements OnInit {

  users:User[];
  user:User;

  constructor(public api: ApiService, public route: Router) {
    super(api, route);
  }

  resetUser(){
    this.user = {
      id: -1,
      name :'',
      LastName: '',
      code : 0
    }
  }

  ngOnInit() {
    this.resetUser();
    this.getAllUsers();
  }


  getAllUsers(){
    this.api.getAllUsers().subscribe((res:User[])=>{
      this.users = res; 
    })
  }

  save(){
    const body: User = {
      id :this.user.id,
      name : this.user.name,
      LastName: this.user.LastName,
      code: this.user.code,
      pass: this.user.pass,
      role: this.user.role,
    }
    if(this.user.id === -1){
      delete body.id;
      this.api.insertUser(body).subscribe((res)=>{
        this.getAllUsers();
      });
    } else {
      this.api.updateUser(body).subscribe((res)=>{
        this.getAllUsers();
      });
    }
    this.resetUser();
  }

    delete(id){
      this.api.deleteUser(id).subscribe((res)=>{
        this.getAllUsers();
      });
    }

    edit(user: User){
      this.user = {
        id: user.id,
        name : user.name,
        LastName: user.LastName,
        code : user.code,
        pass : user.pass,
        role: user.role
      }
    }
  

}
