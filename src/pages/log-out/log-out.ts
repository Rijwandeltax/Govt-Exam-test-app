import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { SigninProvider } from '../../providers/signin/signin';

/**
 * Generated class for the LogOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-out',
  templateUrl: 'log-out.html',
})
export class LogOutPage {

  constructor(public service:SigninProvider,
    private events: Events,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.service.removeData();
    this.events.publish('user:logout');
    this.navCtrl.setRoot('DashboardPage');
  }

}
