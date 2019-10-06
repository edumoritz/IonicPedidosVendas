import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Request } from '../../models/request.model';
import { RequestsService } from '../../services/requests.service';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.page.html',
  styleUrls: ['./requests-list.page.scss']
})
export class RequestsListPage {
  requests$: Observable<Request[]>;

  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private requestsService: RequestsService
  ) {}

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.requests$ = this.requestsService.getAll();
    this.requests$.pipe(take(1)).subscribe(requests => loading.dismiss());
  }

  onUpdate(request: Request): void {
    this.navCtrl.navigateForward(['requests', 'edit', request.id]);
  }

  onDetail(request: Request): void {
    this.navCtrl.navigateForward(['requests', 'detail', request.id]);
  }

  async onDelete(request: Request): Promise<void> {
    await this.overlayService.alert({
      message: `Você deseja realmente deletar a tarefa "${request.title}"?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.requestsService.delete(request);
            await this.overlayService.toast({
              message: `Pedido "${request.title}" deletado!`
            });
          }
        },
        'No'
      ]
    });
  }
}
