import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { SigninProvider } from '../../providers/signin/signin';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-updateprofile',
  templateUrl: 'updateprofile.html',
})
export class UpdateprofilePage implements OnInit  {
  profile: {};
  public user                   : FormGroup;
 public name                   : any;
 public email                  : any;
 public mobile                 : any;
  constructor(public viewCtrl: ViewController,public navCtrl    : NavController,
    public http       : Http,
    public NP         : NavParams,
    public fb         : FormBuilder,
    public toastCtrl  : ToastController,
    public service : SigninProvider,public dataProvider:DataProvider ) {
  }

  ngOnInit() {
    this.user = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    mobile: new FormControl('', [Validators.required,, Validators.minLength(10)]),
    });
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }



  ionViewDidLoad() {
/*this.service.getData().then(data=>{
      this.profile = data;
    })*/
    this.profile = [{email:'riju@g.com',name:'rijwan',mobile:9636434242}]
   }

  saveEntry()
  { 
    let name      : string   = this.user.controls["name"].value,
       email      : string   = this.user.controls["email"].value,
       mobile     : string   = this.user.controls["mobile"].value

    let data=JSON.stringify({code:'md5(email+"SANTA")',email:email,name:name,mobile:mobile});
    console.log(data);
    //this.dataProvider.updateUser(data).then(res=>{
      this.http.post('http://breakinterview.com/mobile/user/updateprofile',data).map(res => res.json()).subscribe(res=>{
        
        if(res==200){
          this.service.getset(name,email,mobile);
          this.sendNotification("Successfully Updated profile");
          this.navCtrl.setRoot("DashbordPage");
        }
        else{
          this.sendNotification('Not update profile');
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        }
      },err=>{
        //reject(err);
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
 