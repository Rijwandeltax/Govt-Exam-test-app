import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides, AlertController, Platform, Nav, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import {  MenuController } from 'ionic-angular';
/**
 * Generated class for the TakingTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-taking-test',
  templateUrl: 'taking-test.html',
})
export class TakingTestPage {
  time: any;
  unattemp: number;
  alert: any;
  perColor: string;
  degree: number;
  timePercentage: number;
  Minutes: number=0;
  Seconds: number=0;
  var_sec:any;
  var_Min:any='0';
  percentage: any;
  wrong: number;
  correct: number;
  attempted: number;
  total_question: number;
  questions: {};
  answers:any = [];
  selected_options:any =[];
  selectedIndex:any= [];
  @ViewChild(Slides) slides: Slides;
  testId :string = this.navParams.get('testId');
  title  :string = this.navParams.get('title'); 
  @ViewChild(Nav) nav: Nav;
  constructor(public modalCtrl: ModalController,private platform: Platform,public alertCtrl: AlertController,private menu : MenuController,public data:DataProvider,public navCtrl: NavController, public navParams: NavParams) {
   var temp=this;
  // console.log(temp.Seconds);
    setInterval(function(){ 
      temp.Seconds=(temp.Seconds+1)%60;
    //  console.log(temp.Seconds);
      if(temp.Seconds>=0&&temp.Seconds<=9)
          temp.var_sec='0';
      else
      temp.var_sec='';
   
           if(temp.Seconds==0){
            temp.Minutes++;
                 if(temp.Minutes>=0&&temp.Minutes<=9)
                 temp.var_Min='0';
                 else
                 temp.var_Min='';
           }
          // console.log(temp.Minutes);
         
      
  }, 1000);

  platform.ready().then(() => {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need

    platform.registerBackButtonAction(() => {
      if(this.nav.canGoBack()){
        this.nav.pop();
      }else{
        if(this.alert){ 
          this.alert.dismiss();
          this.alert =null;     
        }else{
          this.showAlert();
         }
      }
    });
  });

}

showAlert() {
  let alert = this.alertCtrl.create({
    title: 'Use this lightsaber?',
    message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
    buttons: [
      {
        text: 'Cancel',
        handler: () => {
          this.alert =null;
        }
      },
      {
        text: 'Exit',
           handler: () => {
             this.platform.exitApp();
            }
      }
    ]
  });

  alert.present();
}



  ionViewDidLoad() {
    this.menu.enable(false);
    this.slides.lockSwipes(true);
    this.data.getQuestionByTetsId(this.testId).then(data=>{
      this.questions = data;
      console.log(this.questions);
      this.total_question = Object.keys(data).length
      console.log(this.questions[0].options);
      if(Object.keys(data).length<0){ 
        alert("Data comming Soon")
     }
    }) 
  }
  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menu.enable(true);
  }
  nextSlide(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
  PreviousSlide(){
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }
 
  optionselected(key,option_id,is_correct){
    console.log(key+" "+ option_id+" "+is_correct);
    this.selectedIndex[this.slides.getActiveIndex()]=key;
    this.answers[this.slides.getActiveIndex()]=is_correct;
    this.selected_options[this.slides.getActiveIndex()]=option_id;
  }
  check(key){
    if(this.selectedIndex[this.slides.getActiveIndex()]==key){
      return 1;
    } 
    else{
      return 0;
    }
  }
  isFirst() {
    if (this.slides.getActiveIndex() == 0) {
        return false;
       
    } else {
        return true;
        
    }
};

isLast(){
    if (this.slides.getActiveIndex() == this.total_question - 1) {
        return false;
    } else {
        return true;
    }
}
dodfsubmit(){
  console.log(this.answers);
  this.attempted=0; this.correct=0; this.wrong=0;
  for(var i=0;i<=(this.slides.getActiveIndex());i++){
    
     if(this.answers[i]==0)   
         this.wrong++;
     else if(this.answers[i]==1)
        this.correct++;
  }
 // alert(this.wrong);
  this.percentage=Math.ceil((this.correct/this.total_question)*100);
  //this.timePercentage=Math.ceil(((this.Minutes*60+this.Seconds)/(this.total_question*60))*100);
 // console.log("timePercentage: "+this.timePercentage);
  alert(this.percentage);
  if(this.percentage<=50){
     this.degree=89+(this.percentage*3.6);
     this.perColor="#cccccc";
  }
  else{
     this.degree=(this.percentage*3.6)-90;
     this.perColor="#307bbb";
  }

}
submit() {
  let alert = this.alertCtrl.create({
    title: 'Submit',
    message: 'Are you sure you want to submit the test for validation',
    buttons: [
      {
        text: 'Yes',
        handler: () => {
          console.log('agree clicked');

          this.attempted=0; this.correct=0; this.wrong=0;
          for(var i=0;i<=(this.slides.getActiveIndex());i++){
    
            if(this.answers[i]==0)   
                this.wrong++;
            else if(this.answers[i]==1)
                this.correct++;
          }
        // alert(this.wrong);
          this.unattemp=this.total_question-this.correct-this.wrong;
          console.log(this.unattemp);
          this.percentage=Math.ceil((this.correct/this.total_question)*100);
          console.log(this.percentage);
          //this.timePercentage=Math.ceil(((this.Minutes*60+this.Seconds)/(this.total_question*60))*100);
        // console.log("timePercentage: "+this.timePercentage);
          if(this.percentage<=50){
            this.degree=89+(this.percentage*3.6);
            this.perColor="#cccccc";
          }
          else{
            this.degree=(this.percentage*3.6)-90;
            this.perColor="#307bbb";
          }
          //let myModal = this.modalCtrl.create('TestreportPage');
          let pram = [{'title':this.title,'testId':this.testId,'correct': this.correct,'total_question':this.total_question,'wrong':this.wrong,'unattemp':this.unattemp,'percentage':this.percentage,'degree':this.degree,'percolor':this.perColor,'var_Min':this.var_Min,'Minutes':this.Minutes,'var_sec':this.var_sec,'second':this.Seconds },this.answers,this.selected_options]
          let myModal = this.modalCtrl.create('TestreportPage',{ data: pram });
          myModal.present();
        }
      },
      {
        text: 'No',
        handler: () => {
          console.log('Agree clicked');
        }
      }
    ]
  });

  alert.present();
}


}
