import { Component, OnInit } from '@angular/core';
import { ApiService, IE } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../auth';
import * as _ from 'lodash';

@Component({
  selector: 'app-ie',
  templateUrl: './ie.component.html',
  styleUrls: ['./ie.component.scss']
})
export class IEComponent extends Auth  implements OnInit {

  IEs: IE[];
  IE: IE;
  groupIEs= [];

  entryHours;
  entryMinuts;
  exitHours;
  exitMinuts;

  constructor(
    public api: ApiService, 
    public router: Router,
    public activatedRoute: ActivatedRoute) {
      super(api, router);
    }
   
    
  resetIE(){
    this.IE = {
      id: -1,
      entryTime: '',
      exitTime: ''
    }
  }

  ngOnInit() {
    this.resetIE();
    this.getAllIEs();
  }

  getAllIEs() {
    this.groupIEs= [];
    this.api.getAllIEs(this.api.user().loginId).subscribe((res:IE[])=>{
      this.IEs = res;
      res = _.uniqBy( res.map((f: any)=> {f.shamse = this.api.getTimeStampToJalali(f.updatedAt); return f; }) , 'shamse');

      res.forEach((f: IE)=>{
        this.groupIEs.push(this.getFullTime(f.updatedAt));
      })
      
    })
  }

  save(){
    this.IE.entryTime = this.entryHours + ':' + this.entryMinuts;
    this.IE.exitTime = this.exitHours + ':' + this.exitMinuts;
    const body: IE = {
      id : this.IE.id,
      entryTime : this.IE.entryTime,
      exitTime : this.IE.exitTime,
      walk : this.IE.walk,
      user: (this.api.user().loginId as any)
    }
    debugger;
    if(this.IE.id === -1){
      delete body.id;
      this.api.insertIE(body).subscribe((res)=>{
        this.getAllIEs();
      });
    } else {
      this.api.updateIE(body).subscribe((res)=>{
        this.getAllIEs();
      });
    }
    this.resetIE();
  }

    delete(ids){
      ids.forEach(id => {
      this.api.deleteIE(id).subscribe((res)=>{
        this.getAllIEs();
      });
    })
  }

    edit(IE: IE){
      this.IE = {
        id: IE.id,
        entryTime: IE.entryTime,
        exitTime: IE.exitTime,
        walk: IE.walk,
        user: (this.api.login as any)
      }
    }

    getFullTime(date){
      date = this.api.getTimeStampToJalali(date);
      var dates = this.IEs.filter((f: IE) => (this.api.getTimeStampToJalali(f.createdAt) === date || this.api.getTimeStampToJalali(f.updatedAt) === date));
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
