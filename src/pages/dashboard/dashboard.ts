import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  slider=[
    {
    title:'Solve Questions',
    other:'Challenge yourself by solving our tricky questions'
    },
    {
      title:'Track Performance',
      other:'Analyze your performance in each section'
    },
    {
      title:'Daily Current Affairs',
      other:'Update yourself with latest current affairs'
    }

  ]
  GoToPractice(){
    this.navCtrl.setRoot('PracticePage');
  }
  GoToCurrent(){
    this.navCtrl.setRoot('PracticePage');
  }

}
