import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-testreport',
  templateUrl: 'testreport.html',
})
export class TestreportPage {

  selectedOptions: any;
  da: any;
  answerKey: any;
  testId: any;
  percolor: any;
  degree: any;
  Seconds: any;
  var_sec: any;
  Minutes: any;
  var_Min: any;
  percentage: any;
  unattemp: any;
  TotalQuestions: any;
  wrong: any;
  correct: any;
  title: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.myParam = NavParams.get('myParam');
  }

  ionViewDidLoad() {
    this.da = this.navParams.get('data');
    console.log(this.da[0].title);
    this.answerKey=this.da[1];
    this.selectedOptions = this.da[2];
    this.title=this.da[0].title;
    this.testId=this.da[0].testId;
    this.correct=this.da[0].correct;
    console.log(this.correct);
    this.TotalQuestions=this.da[0].total_question ;
    this.wrong=this.da[0].wrong;  
    this.unattemp=this.da[0].unattemp; 
    this.percentage=this.da[0].percentage;
    this.degree=this.da[0].degree; 
    this.percolor=this.da[0].percolor; 
    this.var_Min=this.da[0].var_Min; 
    this.Minutes=this.da[0].Minutes; 
    this.var_sec=this.da[0].var_sec;
    this.Seconds=this.da[0].second;

   // console.log(this.degree);
   /* this.degree='150';
    this.percolor='red';*/
  }
  sty(){
    /*let styles = {
      'background-color':'linear-gradient('+this.degree+'deg, transparent 50%, '+this.percolor+' 50%),linear-gradient(90deg, #a75353 50%, transparent 50%);'
    };
    return styles;*/
  }
  modal_back(){
    this.navCtrl.setRoot('TestpagecontentPage');
  }
  modal_Review(){
    let datareview = [{'testId':this.testId},this.answerKey,this.selectedOptions]
   
    this.navCtrl.setRoot('TestreviewPage',{'dataa':datareview});
  }
  

}
