import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UpdateprofilePage } from '../updateprofile/updateprofile';
import { SigninProvider } from '../../providers/signin/signin';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile: any;

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,public service:SigninProvider) {
  }

  ionViewDidLoad() {
   this.service.getData().then(data=>{
     this.profile = data;
   })
  }
  update(){
   // this.navCtrl.push('UpdateprofilePage');
   let myModal = this.modalCtrl.create('UpdateprofilePage');
   myModal.onDidDismiss(data => {
    
    this.navCtrl.getActive();   
  });
  
          myModal.present();
            
  }
  updateIcon(){
    let myModal = this.modalCtrl.create('IconupdatePage');
    myModal.onDidDismiss(data => {
      this.navCtrl.getActive();   
    });
          myModal.present();
  }

}
