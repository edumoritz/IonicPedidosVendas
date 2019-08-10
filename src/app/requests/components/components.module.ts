import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { RequestItemComponent } from './request-item/request-item.component';

@NgModule({
  declarations: [RequestItemComponent],
  imports: [SharedModule],
  exports: [RequestItemComponent]
})
export class ComponentsModule {}
