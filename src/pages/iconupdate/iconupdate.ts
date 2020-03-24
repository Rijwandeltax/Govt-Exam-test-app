import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { SigninProvider } from '../../providers/signin/signin';

@IonicPage()
@Component({
  selector: 'page-iconupdate',
  templateUrl: 'iconupdate.html',
})
export class IconupdatePage {

  k: any;
  Icon_images: { icon: string; }[];
  constructor(private events: Events,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams,public service:SigninProvider) {
  }

  ionViewDidLoad() {
   this.Icon_images = [{icon:"assets/imgs/icon1.png"},{icon:"assets/imgs/icon2.png"},{icon:"assets/imgs/icon3.png"},{icon:"assets/imgs/icon4.png"},{icon:"assets/imgs/icon5.png"},{icon:"assets/imgs/icon6.png"},{icon:"assets/imgs/icon7.png"},{icon:"assets/imgs/icon8.png"},{icon:"assets/imgs/icon9.png"}];
    console.log(this.Icon_images);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  getImage(j){
    alert(j);
    this.k = "icon"+j+".png";
    this.service.setProfilePic(this.k);
    this.events.publish('user:login');
    this.viewCtrl.dismiss();
  }
}
