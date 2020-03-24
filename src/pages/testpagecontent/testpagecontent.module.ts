import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestpagecontentPage } from './testpagecontent';

@NgModule({
  declarations: [
    TestpagecontentPage,
  ],
  imports: [
    IonicPageModule.forChild(TestpagecontentPage),
  ],
})
export class TestpagecontentPageModule {}
