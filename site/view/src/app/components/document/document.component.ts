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
  formSuccess = false;
  duplicateForm = false;
  changerUser = { name: '', status: ''};
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
      status: '',
      class:'',
      date:'',
      formNumber:'',
      hour: 1
    }
  }

  ngOnInit() {
    this.resetDocument();
  //  this.getAllDocuments();
  }

  getAllDocuments(){
    this.api.getAllDocuments().subscribe((res:Document[])=>{
      this.Documents = res;
      
    })
  }

  changeCode(e){
      this.api.findByCodeDocument(e).subscribe((f: any)=>{
        this.duplicateFormCheck(f);
        this.Documents = f;
      })
  }

  changeFormNumber(e){
      this.api.findByFormNumberDocument(e).subscribe((f: any)=>{ 
        this.duplicateFormCheck(f);
        this.Documents = f;
      })
  }

  duplicateFormCheck(f){
    if(f.length){
      this.duplicateForm = true;
    } else {
      this.duplicateForm = false;
    }
  }

  changeDate(e){
    this.api.findByDateDocument(e).subscribe((f: any)=>{
      this.Documents = f;
    })
  }



  save(){
    if(this.duplicateForm){
      var valid = confirm("فرم تکراری است از ثبت آن مطمئن هستید؟");
      if(valid){
      this.saveToDatabase();
      }
    } else {
      this.saveToDatabase();
    }
 
  }

  saveToDatabase(){
    const body: Document = {
      id : this.Document.id,
      code : this.Document.code,
      status : this.Document.status,
      class : this.Document.class,
      formNumber: this.Document.formNumber,
      date : this.Document.date,
      user: (this.api.user().loginId as any),
      hour: this.Document.hour
    }
    if(this.Document.id === -1){
      delete body.id;
      this.api.insertDocument(body).subscribe((res)=>{
        this.submitTrue();
        //this.getAllDocuments();
      });
    } else {
      this.api.updateDocument(body).subscribe((res)=>{
        this.submitTrue();
       // this.getAllDocuments();
      });
    }
    this.resetDocument();
  }

    delete(id){
      this.api.deleteDocument(id).subscribe((res)=>{
        //this.getAllDocuments();
      });
    }

    edit(Document: Document){
      this.Document = {
        id: Document.id,
        code: Document.code,
        status: Document.status,
        class: Document.class,
        formNumber: Document.formNumber,
        hour: this.Document.hour
      }
    }

    getfillAll() {
      if(this.Document.code
      && this.Document.status
      && this.Document.class
      && this.Document.formNumber
      && this.Document.date
      && this.Document.hour){
        return true;
      } else {
        return false;
      }
    }

    submitTrue(){
      this.formSuccess = true;
      setTimeout(()=>{
        this.formSuccess = false;
      }, 2000)
    }
}
