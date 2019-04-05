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
    localStorage.removeItem("user");
  }

  login() {
     this.api.login(this.user).subscribe((res: User[])=>{
       
       if(!localStorage.getItem("salary")){
        localStorage.setItem("salary", JSON.stringify({
          "1":1000,
          "2":1000,
          "3":1000,
          "4":1000,
        })) 
       }

       if(res.length) {
         localStorage.setItem("user",JSON.stringify({
          loginId: res[0].id,
          role : res[0].role,
          userName: ((res[0].name ? res[0].name : '') +' '+ (res[0].LastName ? res[0].LastName : ''))
         }))
         if(+res[0].role === 0){
          this.route.navigate(['app/users']);
         } else{
          this.route.navigate(['app/ie']);
         }
       } else {
          this.error = true;
       }
     })
  }

}
