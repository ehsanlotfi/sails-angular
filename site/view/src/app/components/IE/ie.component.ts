import { Component, OnInit } from '@angular/core';
import { ApiService, IE } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-ie',
  templateUrl: './ie.component.html',
  styleUrls: ['./ie.component.scss']
})
export class IEComponent extends Auth  implements OnInit {

  IEs: IE[];
  IE: IE;

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

  getAllIEs(){
    this.api.getAllIEs().subscribe((res:IE[])=>{
      this.IEs = res;
      
    })
  }

  save(){
    const body: IE = {
      id : this.IE.id,
      entryTime : this.IE.entryTime,
      exitTime : this.IE.exitTime,
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

    delete(id){
      this.api.deleteIE(id).subscribe((res)=>{
        this.getAllIEs();
      });
    }

    edit(IE: IE){
      this.IE = {
        id: IE.id,
        entryTime: IE.entryTime,
        exitTime: IE.exitTime,
      }
    }
}
