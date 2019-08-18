import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestsSavePage } from './requests-save.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: RequestsSavePage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [RequestsSavePage]
})
export class RequestsSavePageModule {}
