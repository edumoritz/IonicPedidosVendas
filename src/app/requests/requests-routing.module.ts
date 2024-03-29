import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create',
        loadChildren: './pages/requests-save/requests-save.module#RequestsSavePageModule'
      },
      {
        path: 'edit/:id',
        loadChildren: './pages/requests-save/requests-save.module#RequestsSavePageModule'
      },
      {
        path: 'detail/:id',
        loadChildren: './pages/request-detail/request-detail.module#RequestDetailPageModule'
      },
      {
        path: '',
        loadChildren: './pages/requests-list/requests-list.module#RequestsListPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule {}
