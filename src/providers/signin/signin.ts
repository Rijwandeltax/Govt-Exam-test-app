import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class SigninProvider {

  constructor(public http: Http, public toastCtrl:ToastController,private nativeStorage: NativeStorage) {
    console.log('Hello SigninProvider Provider');
  }
  save(name,email,mobile){
      this.nativeStorage.setItem('useritem', {name: name,email:email,mobile:mobile})
        .then(
          (data) => {
           console.log('set');
          }, err => { 
            console.log('error');
          }); 
  }
  checkData(){
    this.nativeStorage.getItem('useritem')
      .then(
        data =>{
         
        }, err => { 
          alert('error');
        });
  }
  getData(){
        return new Promise(resolve =>{   this.nativeStorage.getItem('useritem')
      .then(
        data =>{
          resolve(data);
        }, err => { 
          //resolve([]);
        });
      });
  }
  removeData(){
    this.nativeStorage.remove('useritem')
    .then(
      data=>console.log('Logout done'),
      error=>console.log('error'),
    );
  }
  getset(email,mobile,password){
    this.nativeStorage.remove('useritem')
    .then(
      data=>console.log('data remove'),
      error=>console.log('error'),
    );
    this.save(name,email,mobile);
  }
  setProfilePic(icon){
    this.nativeStorage.setItem('profileitem', {pic:icon});
  }
  getProfilePic(){
    return new Promise(resolve =>{   this.nativeStorage.getItem('profileitem')
    .then(
      data =>{
        resolve(data);
      }, err => { 
        //resolve([]);
      });
    });
  }
}
