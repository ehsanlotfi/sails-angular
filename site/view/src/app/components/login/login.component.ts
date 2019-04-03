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
    code: 8633,
    pass : '1234'
  }
 
  constructor(private api: ApiService, private route: Router) { }

  ngOnInit() {
  }

  login(){
     this.api.login(this.user).subscribe((res: User[])=>{
       if(res.length){
         this.api.user = {
          loginId: res[0].id,
          role : res[0].role,
          userName: res[0].name +' '+ res[0].LastName
         }
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
