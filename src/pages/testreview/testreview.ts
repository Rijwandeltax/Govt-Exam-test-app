import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-testreview',
  templateUrl: 'testreview.html',
})
export class TestreviewPage {
  selected_options: any;
  da: any;
  questions: {};
  testId:any;
  total_question: number;
  answer: any;
  @ViewChild(Slides) slides: Slides;
  @ViewChild('scroll') scroll: any;
  constructor(public data:DataProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.da = this.navParams.get('dataa');
    console.log(this.da);
    this.answer = this.da[1];
    console.log(this.answer);
    
    this.selected_options = this.da[2];
    console.log(this.answer);
    console.log(this.selected_options);
    this.data.getQuestionByTetsId(this.da[0].testId).then(data=>{
      this.questions = data;
      console.log(this.questions);
      this.total_question = Object.keys(data).length
      console.log(this.total_question);
    //  console.log(this.questions[0].options);
    })
  }
  goToSlide(i) {
    this.slides.slideTo(i, 500);
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    let previousIndex = this.slides.getPreviousIndex();
    console.log('Current index is', currentIndex);
   /* if(previousIndex<currentIndex){
      this.scroll.scrollElement.scrollleft = 30;
    }
    else{
      this.scroll.scrollElement.scrollLeft = 20;
    }*/
  }
  getStyle(i){
   if(this.answer[i]==1){
      if(this.slides.getActiveIndex()==i){
        let styles = {
              "border-color": "#9ecaed",
              "box-shadow": "0 0 10px #9ecaed",
              "background-color": "#31ad4b",
        };
        return styles;
      }
      else{
        return{
          "background-color": "#31ad4b",
        }
      }
    }
    else if(this.answer[i]==0){
      if(this.slides.getActiveIndex()==i){
        return{
          "border-color": "#9ecaed",
          "box-shadow": "0 0 10px #9ecaed",
          "background-color": "#e54a4a",
         }
       }
      else{
        return {
           "background-color": "#e54a4a",
       }
     }
    }
    else{
      if(this.slides.getActiveIndex()==i){
        let styles = {
              "border-color": "#9ecaed",
              "box-shadow": "0 0 10px #9ecaed",
              "background-color": "#fcb640",
        };
        return styles;
      }
      else{ 
        return {
          "background-color": "#fcb640",
      }
      }
    }
  }
  isLast(){
    if (this.slides.getActiveIndex() == this.total_question - 1) {
        return false;
    } else {
        return true;
    }
  }
  GetImage(val){
    if(val===this.selected_options[this.slides.getActiveIndex()])
       return 1;
    else
       return 0; 
  }
}
