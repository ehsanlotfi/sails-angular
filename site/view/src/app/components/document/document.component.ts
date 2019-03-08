import { Component, OnInit } from '@angular/core';
import { ApiService, Document } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent extends Auth  implements OnInit {

  Documents: Document[];
  Document: Document;
  userId;
  changerUser;
  constructor(
    public api: ApiService, 
    public router: Router,
    public activatedRoute: ActivatedRoute) {
      super(api, router);
    }
   
    
  resetDocument(){
    this.Document = {
      id: -1,
      code: '',
      status: ''
    }
  }

  ngOnInit() {
    this.resetDocument();
    this.getAllDocuments();
  }

  getAllDocuments(){
    this.api.getAllDocuments().subscribe((res:Document[])=>{
      this.Documents = res;
      
    })
  }

  changeCode(e){
    this.changerUser = '';
      this.api.findByCodeDocument(+e).subscribe((f: any)=>{
        if(f.length){
            this.changerUser = f[0].user.name;
        }
      })
  }

  save(){
    const body: Document = {
      id : this.Document.id,
      code : this.Document.code,
      status : this.Document.status,
      user: (this.api.loginId as any)
    }
    if(this.Document.id === -1){
      delete body.id;
      this.api.insertDocument(body).subscribe((res)=>{
        this.getAllDocuments();
      });
    } else {
      this.api.updateDocument(body).subscribe((res)=>{
        this.getAllDocuments();
      });
    }
    this.resetDocument();
  }

    delete(id){
      this.api.deleteDocument(id).subscribe((res)=>{
        this.getAllDocuments();
      });
    }

    edit(Document: Document){
      this.Document = {
        id: Document.id,
        code: Document.code,
        status: Document.status,
      }
    }
}
