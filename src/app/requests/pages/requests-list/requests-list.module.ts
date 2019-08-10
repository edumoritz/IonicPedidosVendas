import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestsListPage } from './requests-list.page';

const routes: Routes = [
  {
    path: '',
    component: RequestsListPage
  }
];

@NgModule({
  imports: [SharedModule, ComponentsModule, RouterModule.forChild(routes)],
  declarations: [RequestsListPage]
})
export class RequestsListPageModule {}
