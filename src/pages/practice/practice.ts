import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-practice',
  templateUrl: 'practice.html',
})
export class PracticePage {
  itemms: any;
  Topic:any=[];
  items: any=[];
 
  current: {};
  shownGroup = null;
  diseases = [
    { title: "Type 1 Diabetes", description: "Type 1 diabetes is an autoimmune disease in which the body’s immune system attacks and destroys the beta cells in the pancreas that make insulin." },
    { title: "Multiple Sclerosis", description: "Multiple sclerosis (MS) is an autoimmune disease in which the body's immune system mistakenly attacks myelin, the fatty substance that surrounds and protects the nerve fibers in the central nervous system." },
    { title: "Crohn's & Colitis", description: "Crohn's disease and ulcerative colitis (UC), both also known as inflammatory bowel diseases (IBD), are autoimmune diseases in which the body's immune system attacks the intestines." },
    { title: "Lupus", description: "Systemic lupus erythematosus (lupus) is a chronic, systemic autoimmune disease which can damage any part of the body, including the heart, joints, skin, lungs, blood vessels, liver, kidneys and nervous system." },
    { title: "Rheumatoid Arthritis", description: "Rheumatoid arthritis (RA) is an autoimmune disease in which the body's immune system mistakenly begins to attack its own tissues, primarily the synovium, the membrane that lines the joints." }
  ];

  constructor(public navCtrl: NavController,public data:DataProvider) {

  }
  

  ionViewDidLoad() {
    this.data.getAllSubject().then(data=>{
      this.current = data;
      for(var i=0;i<Object.keys(data).length;i++){ 
        var item=this.current[i].subjects_info;
        this.Topic[i]=item.length;
        this.current[i].cateogry_icon="http://breakinterview.com/img/"+this.current[i].cateogry_icon;
        console.log(this.current);
     }
     console.log(this.current);

     /* for(var i=0;i<Object.keys(data).length;i++){ 
        this.data.getTestIdBySubject(this.current[i].subject_id).then(res=>{
          this.Topic=Object.keys(res).length;
           this.items[i]=res;
          //
        //  console.log(this.Topic[i]);
         // console.log(this.items[i]);
          //console.log(this.Topic[i]);
        })
        // var item=this.data[i].subjects_info;
       // this.Topic[i]=item.length; 
     }*/
    }) 
    console.log(this.Topic);
  }

  goTestpage(id1,id2){
    var items = {'id1':id1,'id2':id2};
    this.navCtrl.push('TestpagecontentPage',items);
  }
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        console.log(group);
        this.itemms = this.current[group].subjects_info;
        console.log(this.itemms);
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
      return this.shownGroup === group;
  };

 
}
