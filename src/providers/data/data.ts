import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

@Injectable()
export class DataProvider {
  apiUrl: string = 'http://breakinterview.com';
  items: any;

  constructor( public http: Http, public toastCtrl  : ToastController) {}

  //app signup and sign in
  getStatus(){
    return new Promise(resolve=>{
      this.http.get(this.apiUrl+'/mobile/getcsrfjson').map(res => res.json()).subscribe(data=>{
        resolve(data.token);
      },err=>{
        console.log(err);
      });
    });
  }
  addUser(data){
    return new Promise((resolve)=>{
      this.http.post(this.apiUrl+'/mobile/user/register',data).subscribe(res=>{
        resolve(res);
      },err=>{
        console.log(err);
      });
    });
  }
  addLogin(data){
    console.log(data);
    return new Promise((resolve)=>{
      this.http.post(this.apiUrl+'/mobile/user/login',data).map(res => res.json()).subscribe(res=>{
        resolve(res);
      },err=>{
        console.log(err);
      });
    });
  }
  updateUser(data){
    return new Promise((resolve)=>{
      this.http.post(this.apiUrl+'/mobile/user/updateprofile',data).map(res => res.json()).subscribe(res=>{
        resolve(res);
      },err=>{
        //reject(err);
      });
    });
  }
  getSection(){
    return new Promise(resolve=>{
      this.http.get(this.apiUrl+'/mobile/govt/cf/getdatelist').map(res => res.json()).subscribe(data=>{
        resolve(data);
      },err=>{
        console.log(err);
      });
    });
  }
  getDateSection(date){
    console.log(date);
    return new Promise(resolve=>{
      this.http.get(this.apiUrl+'/mobile/govt/cf/daily/'+date).map(res => res.json()).subscribe(data=>{
        resolve(data);
        console.log(data);
      },err=>{
        console.log(err);
      });
    });
  }
  getAllSubject(){
    return new Promise(resolve=>{
      this.http.get(this.apiUrl+'/mobile/govt/practice/getcategory').map(res => res.json()).subscribe(data=>{
        console.log(data);
        resolve(data);
      },err=>{
        console.log(err);
      });
    });
  }
  getTestIdBySubject(subject_id){
    return new Promise(resolve=>{
      this.http.get(this.apiUrl+'/mobile/govt/practice/titles/'+subject_id).map(res => res.json()).subscribe(data=>{
       // console.log(data);
        resolve(data);
      },err=>{
        console.log(err);
      });
    });
  }
  getQuestionByTetsId(test_id){
    return new Promise(resolve=>{
      this.http.get(this.apiUrl+'/mobile/govt/practice/testdata/'+test_id).map(res => res.json()).subscribe(data=>{
        resolve(data);
      },err=>{
        console.log(err);
      });
    });
  }
  getDataParticularQuestion(question){
    return new Promise(resolve=>{
      this.http.get(this.apiUrl+'/mobile/code/practice/testdata/'+question).map(res => res.json()).subscribe(data=>{
        resolve(data);
      },err=>{
        console.log(err);
      });
    });
  }
  
   sendNotification(message)  : void
      {
         let notification = this.toastCtrl.create({
             message       : message,
             duration      : 3000
         });
         notification.present();
      }
}
