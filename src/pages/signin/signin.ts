import { Component } from '@angular/core';
import { NavController, IonicPage,ToastController, Events } from 'ionic-angular';
import {  OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { SigninProvider } from '../../providers/signin/signin';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit {
  result: any;
  getcrf: {};

    user: FormGroup;

    constructor(public navCtrl    : NavController,
      public http       : Http,
      public toastCtrl  : ToastController,public service:SigninProvider,
      private events: Events,public data:DataProvider) {

    }
    ngOnInit() {

    this.user = new FormGroup({
    //name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });

    }
    ionViewWillLoad(){
      this.data.getStatus().then(res=>{
        console.log(res);
         this.getcrf = res;
       });
    }
    openpass(){
      this.navCtrl.push('ForgetPage');
    }
    openSign(){
      this.navCtrl.setRoot('SignupPage');
    }
  
    saveEntry()
    { 
      let email       : string   = this.user.controls["email"].value,
         password     : string   = this.user.controls["password"].value,
          mobile      : string   ="";
      let data={_token:this.getcrf,email:email,password:password};
      console.log(data);
      this.http.post('http://breakinterview.com/mobile/user/login',data).map(res => res.json()).subscribe(res=>{
           console.log(res);
           if(res.status==200){
            this.service.save(name,email,mobile);
            this.events.publish('user:login');
            this.sendNotification(`Congratulation : you  successfully Logged In`);
            this.navCtrl.setRoot('DashboardPage');
          }
          else{
           // console.log("ok not"); 
            this.sendNotification(res.error);
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
          }
              },err=>{
                this.sendNotification("something went wrong");
                this.navCtrl.setRoot(this.navCtrl.getActive().component);
            console.log(err);
           });

     // console.log(data);
      /*this.data.addLogin(data).then(data=>{
        console.log(data);
       /* if(data==200){
          this.events.publish('user:login');
          this.navCtrl.setRoot('DashboardPage');
          this.service.save(name,email,mobile);
        }
        else{
          this.sendNotification('Wrong Signin details!');
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        }*/
     
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