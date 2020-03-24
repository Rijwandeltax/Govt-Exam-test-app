import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the TestpagecontentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testpagecontent',
  templateUrl: 'testpagecontent.html',
})
export class TestpagecontentPage {
  current: {};
  id1:string = this.navParams.get('id1');
  id2:string = this.navParams.get('id2'); 
  levels=["Beginner","Intermediate","Hard"];
  colors=["#1be600","#e6b500","#d4a91c"];
  constructor(public navCtrl: NavController, public navParams: NavParams,public data:DataProvider) {
  }

  ionViewDidLoad() {
    // pass subject id and get test
    this.data.getTestIdBySubject(this.id1).then(data=>{
      this.current = data;
      console.log(this.current);
      if(Object.keys(data).length<0){ 
        alert("Data comming Soon")
     }
    }) 
  }
  test(test_id,title){
    var items = {'testId':test_id,'title':title};
    this.navCtrl.push('TakingTestPage',items);
  }

}
