import { Component, OnInit } from '@angular/core';
import { ApiService,User } from '../api.service';
import { Router } from '@angular/router';

export class Auth {
    constructor(public api: ApiService, public route: Router){
     if(api.loginId === -1){
       this.route.navigate(['login']);
     }
    }
}