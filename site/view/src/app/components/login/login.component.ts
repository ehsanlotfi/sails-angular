import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService,User } from '../../api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {

  error = false;
  user: User = {
    code: null,
    pass : null
  }
 
  constructor(private api: ApiService, private route: Router) { }

  ngOnInit() {
  }

  login(){
     this.api.login(this.user).subscribe((res: User[])=>{
       if(res.length){
         this.api.loginId = res[0].id;
          this.route.navigate(['users']);
       } else {
          this.error = true;
       }
     })
  }

}
