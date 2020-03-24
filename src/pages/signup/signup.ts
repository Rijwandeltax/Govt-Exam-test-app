import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import {  OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { SigninProvider } from '../../providers/signin/signin';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {
  result: any;
  mis: string;
  getcrf: any;
 
 public user                   : FormGroup;
 public name                   : any;
 public email                  : any;
 public password               : any;
 public password_again         : any;

  constructor(public navCtrl    : NavController,
    public http       : Http,
    public NP         : NavParams,
    public toastCtrl  : ToastController,
    public service:SigninProvider,
    private events: Events,public data:DataProvider) {
  }
  ngOnInit() {

    this.user = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,, Validators.minLength(4)]),
    password_again: new FormControl('', [Validators.required]),
    });
  }
  
  ionViewWillLoad(){
    
  }
  openSignup(){
    this.navCtrl.setRoot('SigninPage');
  }
  pass(id1,id2){
   // console.log(this.password.length);
    if(this.password_again.length>0){
    if(this.password.length>3){
     // console.log("ok123");
      this.mis='not match password';
      if((this.password===this.password_again)){
     //   console.log("ok");
        this.mis='';
      }
    }
  }
  }

  saveEntry()
  { 
   
    let name      : string   = this.user.controls["name"].value,
       email      : string   = this.user.controls["email"].value,
       password   : string   = this.user.controls["password"].value,
       password_again     : string   = this.user.controls["password"].value,
       mobile :string='';
       this.data.getStatus().then(res=>{
        console.log(res);
         this.getcrf = res;
         let data={_token:this.getcrf,email:email,password:password,password_again:password_again};
         console.log(data);

         if((this.password===this.password_again)){
           this.http.post('http://breakinterview.com/mobile/user/register',data).map(res => res.json()).subscribe(res=>{
            console.log(res);
           if(res.status==200){
           // this.service.save(name,email,mobile);
            this.events.publish('user:login');
            this.sendNotification(`Congratulation : ${name} was successfully added`);
            this.navCtrl.setRoot('DashboardPage');
          }
          else{
           // console.log("ok not");
            this.sendNotification(res.error);
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
          }
              },err=>{
            console.log(err);
            this.sendNotification('Something went wrong!');
           });
             this.mis='';
           }
           else{
            this.mis='not match password';
           }
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
 