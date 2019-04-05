import { Component, OnInit } from '@angular/core';
import { ApiService,User, IE } from '../../api.service';
import { Auth } from '../auth'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

declare var _: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent extends Auth implements OnInit {

  IEs: IE[];
  IE: IE;
  groupUsers= [];

  codeFilter;
  dateFilter = '';

  entryHours;
  entryMinuts;
  exitHours;
  exitMinuts;

  constructor(public api: ApiService, public route: Router) {
    super(api, route);
  }

  ngOnInit(){
    this.groupUsers= [];
      this.getDocumentUserAndTime(null,null);

    /*
    this.api.getFullAllIEs().subscribe((res:IE[])=>{
      this.IEs  = res;
      
      let userIds = _.groupBy(res.map((f: any)=>{f.userId = f.user.id;return f;}), "userId")

      Object.keys(userIds).forEach((t: any) =>{
      //  userIds[t] = _.uniqBy( userIds[t].map((f: any)=> {f.shamse = this.api.getTimeStampToJalali(f.updatedAt); return f; }) , 'shamse');
        
        userIds[t].forEach((f: IE)=>{

          this.api.findByDateAndUserDocument(
            this.api.getTimeStampToJalali(f.updatedAt,"YYYY-MM-DD"), f.user.id).subscribe((dateDocument: Document[])=>{
              const docs= [];
              const docsTmp = _.groupBy(dateDocument, "status");
              Object.keys(docsTmp).forEach(key => {
                docs.push({
                  name: key,
                  count: docsTmp[key].length,
                  time: _.sum(docsTmp[key].map((f: any)=> +f.hour))
                })
              })
            const record: any = this.getFullTime(userIds[t], f.updatedAt);
            record.docs = docs;
            if(!this.groupUsers.filter(f => JSON.stringify(f) === JSON.stringify(record)).length){
              this.groupUsers.push(record);
            }
          })

          
        })
      })
    
      
    }) */
  }

  check(ids){
    ids.forEach( id =>{
      this.api.changeCheckIE(id).subscribe(f=>{})
    })
  }

  
  checkDocument(id){
    this.api.checkDocument(id).subscribe(f=>{})
  }

  getDocumentUserAndTime(user, date){
      this.api.getDocumentUserAndDate(user, date).subscribe((res: Document[])=>{
        this.groupUsers = res;
      })
  }

  getFullTime(data, date) {
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
        check:dates[0].check,
      }
    } else {
      return {
        id: dates.map(f => f.id),
        entryTime1: dates[0].entryTime,
        exitTime1:  dates[0].exitTime,
        walk: dates[0].walk,
        fullTime: (dates[0].walk + (fullTime * -1)).toFixed(2),
        user: dates[0].user,
        check:dates[0].check,
      }
    }
    

  }
 
  exportExcel(){
    const excel = [];
    this.groupUsers.forEach((IE: any, i)=>{
      const docs =  IE.docs.map((doc:any)=>{
        debugger;
        return `  ${doc.name} ${doc.count} مورد به مدت ${doc.time} ساعت`;
      });
      excel.push({
          "ردیف": i + 1,
          "کد پرسنلی": IE.user.code,
          "نام و نام خانوادگی": IE.user.name + ' ' + IE.user.LastName,
          "تاریخ": this.api.getTimeStampToJalali(IE.updatedAt),
          "ساعت ورود1": IE.entryTime1,
          "ساعت خروج1": IE.exitTime1,
          "ساعت ورود2": IE.entryTime2,
          "ساعت خروج2": IE.exitTime2,
          "ایاب و ذهاب	": IE.walk,
          "کارکرد نهایی": IE.fullTime,
          "فعالیت ها": docs && docs.length ? docs[0] : ''
      });
    })
    this.api.exportExcel(excel, "report");
  }
  

}
