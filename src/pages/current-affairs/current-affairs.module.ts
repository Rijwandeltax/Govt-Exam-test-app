import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentAffairsPage } from './current-affairs';

@NgModule({
  declarations: [
    CurrentAffairsPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrentAffairsPage),
  ],
})
export class CurrentAffairsPageModule {}
