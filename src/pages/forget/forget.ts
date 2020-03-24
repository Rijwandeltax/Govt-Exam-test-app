import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { SigninProvider } from '../../providers/signin/signin';

/**
 * Generated class for the ForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {
  public form                   : FormGroup;
  public email                  : any;
   constructor(public navCtrl    : NavController,
     public http       : Http,
     public NP         : NavParams,
     public fb         : FormBuilder,
     public toastCtrl  : ToastController,public service:SigninProvider,
     private events: Events
   ) {
       this.form = fb.group({
         "email"               : ["", Validators.required]
      });
 
   }
 
   saveEntry()
   { 
     let email       : string   = this.form.controls["email"].value
     //mobileno  : string   = '9636434242';
      
    let type      : string   = "application/x-www-form-urlencoded; charset=UTF-8",
     headers   : any      = new Headers({ 'Content-Type': type}),
     options   : any      = new RequestOptions({ headers: headers });
 
     let data=JSON.stringify({keys:"contact",email:email});
     console.log(data);
     this.http.post('http://www.jainbhajan.in/manage-data.php',data,options)
     .map(res => res.json())
     .subscribe(res => {
     //  this.service.savee(res);
       this.events.publish('user:login');
      //this.sendNotification(`Congratulation the query by: ${email} was successfully added`);
     }, (err) => {
      this.sendNotification('Wrong Signin details!');
     });
     this.navCtrl.setRoot(this.navCtrl.getActive().component);
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