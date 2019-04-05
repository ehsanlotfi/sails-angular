import { Component, OnInit } from '@angular/core';
import { ApiService,User } from '../api.service';
import { Router } from '@angular/router';

export class Auth {
    constructor(public api: ApiService, public route: Router) {
        if(localStorage.getItem("user")){
                
        } else {
        this.route.navigate(['login']);
     }
    }
}