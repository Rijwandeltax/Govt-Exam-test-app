import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Network } from '@ionic-native/network';
import { DatabaseProvider } from '../../providers/database/database';
declare var navigator:any;
declare var Connection:any;


@IonicPage()
@Component({
  selector: 'page-currentaffairfull',
  templateUrl: 'currentaffairfull.html',
})
export class CurrentaffairfullPage {
  business: any;
  tech: any;
  sports: any;
  politics: any;
  currentFull: {};
  networks: boolean=false;
  
  pid:string=this.navParams.get('date');
  pet: string = "politics";
  isAndroid: boolean = false;

  constructor(public database:DatabaseProvider,platform: Platform,public navParams: NavParams,public data:DataProvider) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    /*this.database.getDatabaseState().subscribe(rdy => {
      if (rdy) {
         this.fullcurrent();
       }
     })*/
     this.fullcurrent();
  }
  fullcurrent(){
   
    var v = this.pid;
    var fg = v.split('-');
    console.log(fg);
    var datv= fg[0]+"/"+("JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(fg[1])/3+1)+"/"+fg[2];
   // console.log(datv);
    if(datv.length==9){
      datv=datv.substring(0,3)+"0"+datv.substring(3);
    }
    console.log(datv);
    datv= datv.split('/').reverse( ).join('-');

    //if(this.networks){
    this.data.getDateSection(datv).then(data => {
      this.currentFull = data;
      console.log(data);
      if(Object.keys(data).length>0){
        this.politics = data[0].content;
      }
      if(Object.keys(data).length>1){
        this.sports =   data[1].content;
      }
      if(Object.keys(data).length>2){
        this.tech   =     data[2].content;
      }
      if(Object.keys(data).length>3){
        this.business = data[3].content;
      }
      let currentdata = {Date:datv,politics:this.politics,sports:this.sports,technology:this.tech,business:this.business};
      this.database.storeFullstory(currentdata);
      console.log(currentdata.politics);
    }) 
  }
  /*else{
    this.database.getFullStory().then(data => {
      this.currentFull = data;
      console.log(data);
        this.politics = data[0].politics;
        this.sports   = data[1].sports;
        this.tech     = data[2].technology;
        this.business = data[3].business;
  });
  }
  /*  console.log(this.pid);
    this.data.getDateSection(this.pid).then(data => {
      this.currentFull = data;
    //  if(data[0].name=='politics'){
      if(Object.keys(data).length>0){
        this.politics = data[0].content;
      }
      if(Object.keys(data).length>1){
        this.sports =   data[1].content;
      }
      if(Object.keys(data).length>2){
        this.tech   =     data[2].content;
      }
      if(Object.keys(data).length>3){
        this.business = data[3].content;
      }*/
      
     
    
      
      
    //  }
   // })  
 // }
  /*checkNetwork(){
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
