import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Network } from '@ionic-native/network';
import { DatabaseProvider } from '../../providers/database/database';
declare var navigator:any;
declare var Connection:any;

@IonicPage()
@Component({
  selector: 'page-current-affairs',
  templateUrl: 'current-affairs.html',
})
export class CurrentAffairsPage {
  date: any;
  current: {};
  networks: boolean=false;
  dateObj=new Date();
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  constructor(public platform:Platform,public data:DataProvider,public database:DatabaseProvider,public navCtrl: NavController, public navParams: NavParams) {
   // this.checkNetwork();
  }

  ionViewDidLoad() {
    /*this.database.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        
       }
     })*/
     this.currentaffirs();
    }
currentaffirs(){
 // if(this.networks){
    this.data.getSection().then(data=>{
      this.current = data;
    //  this.database.storeDateId(data);
      console.log(data);
      for(var i=0;i<Object.keys(data).length;i++){
        let date = this.current[i].cf_date.split('-').reverse();
        this.current[i].cf_date = date[0]+"-"+this.monthNames[date[1]-1]+"-"+date[2];
      }
    })  
  }
 /* else{
    this.database.getDateData().then(data => {
      this.current = data;
      for(var i=0;i<Object.keys(data).length;i++){
        let date = this.current[i].cf_date.split('-').reverse();
        this.current[i].cf_date = date[0]+"-"+this.monthNames[date[1]-1]+"-"+date[2];
      }
   });
  }
}*/
  dailyUpdate(delta){
    this.date = delta.cf_date;
   
    this.navCtrl.push('CurrentaffairfullPage',{'date':this.date});
  } 
 /* checkNetwork(){
    this.platform.ready().then(()=>{
      var networkState = navigator.connection.type;
 
            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';
            if(states[networkState]!='No network connection'){
              this.networks=true;
            }
            else{
              this.networks=false;
            }
    })
  }*/
}
