import { Component, OnInit } from '@angular/core';
import { ApiService, IE } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../auth';
import * as _ from 'lodash';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent extends Auth  implements OnInit {

  groupUsers = [];
  workList = [];
  codeFilter;
  dateFilter;
    
  constructor(
    public api: ApiService, 
    public router: Router,
    public activatedRoute: ActivatedRoute) {
      super(api, router);
    }
   
    
  ngOnInit(){
    this.groupUsers= [];
    let works = localStorage.getItem("salary");
    if(works){
      works = JSON.parse(works);
      Object.keys(works).forEach(f => {
        this.workList[f] = works[f];
      })
    }

    this.getDocumentUserAndTime(null,null);
  }

    getDocumentUserAndTime(user, date){
      this.api.getDocumentUserAndDate(user, date).subscribe((res: Document[])=>{
        this.groupUsers = res;
      })
  }

  updateWork(){
    let works = {};
    this.workList.forEach((f, i)=>{
      if(this.workList[i]){
        works[i] = f;
      }
    })
    localStorage.setItem("salary", JSON.stringify(works))
  }

}
