import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakingTestPage } from './taking-test';

@NgModule({
  declarations: [
    TakingTestPage,
  ],
  imports: [
    IonicPageModule.forChild(TakingTestPage),
  ],
})
export class TakingTestPageModule {}
