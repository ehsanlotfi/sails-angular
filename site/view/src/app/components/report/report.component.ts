import { Component, OnInit } from '@angular/core';
import { ApiService,User, IE } from '../../api.service';
import { Auth } from '../auth'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent extends Auth implements OnInit {

  IEs: IE[];
  IE: IE;
  groupUsers= [];

  entryHours;
  entryMinuts;
  exitHours;
  exitMinuts;

  constructor(public api: ApiService, public route: Router) {
    super(api, route);
  }

  ngOnInit(){
    this.groupUsers= [];
    this.api.getFullAllIEs().subscribe((res:IE[])=>{
      this.IEs  = res;
      
      let userIds = _.groupBy(res.map((f: any)=>{f.userId = f.user.id;return f;}), "userId")

      Object.keys(userIds).forEach((t: any) =>{
        userIds[t] = _.uniqBy( userIds[t].map((f: any)=> {f.shamse = this.api.getTimeStampToJalali(f.updatedAt); return f; }) , 'shamse');

        userIds[t].forEach((f: IE)=>{
          this.groupUsers.push(this.getFullTime(userIds[t], f.updatedAt));
        })
      })
    
      
    })
  }


  getFullTime(data, date){
    date = this.api.getTimeStampToJalali(date);
    var dates = data.filter((f: IE) => (this.api.getTimeStampToJalali(f.createdAt) === date || this.api.getTimeStampToJalali(f.updatedAt) === date));
    let fullTime = 0;
    dates.forEach((f: IE) => {
        fullTime += (+(f.entryTime.replace(":","."))) - (+(f.exitTime.replace(":",".")));
    });
   
    if(dates.length > 1){
      return {
        id: dates.map(f => f.id),
        entryTime1: dates[0].entryTime,
        exitTime1:  dates[0].exitTime,
        entryTime2: dates[1].entryTime,
        exitTime2: dates[1].exitTime,
        walk: dates[0].walk,
        fullTime: (dates[0].walk + (fullTime * -1)).toFixed(2),
        user: dates[0].user,
      }
    } else {
      return {
        id: dates.map(f => f.id),
        entryTime1: dates[0].entryTime,
        exitTime1:  dates[0].exitTime,
        walk: dates[0].walk,
        fullTime: (dates[0].walk + (fullTime * -1)).toFixed(2),
        user: dates[0].user,
      }
    }
    

  }
 
  

}
