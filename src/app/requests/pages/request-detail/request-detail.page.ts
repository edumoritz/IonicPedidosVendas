import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';

import { RequestsService } from '../../services/requests.service';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.page.html',
  styleUrls: ['./request-detail.page.scss']
})
export class RequestDetailPage {
  requestForm: FormGroup;
  requestId = this.route.snapshot.paramMap.get('id');
  titulo = '';
  desc = '';
  qtd = 0;
  count = 0;

  constructor(
    private navCtrl: NavController,
    private requestsService: RequestsService,
    private overlayService: OverlayService,
    private route: ActivatedRoute
  ) {}

  ionViewDidEnter(): void {
    this.requestsService
      .get(this.requestId)
      .pipe(take(1))
      .subscribe(({ title, description, amount }) => {
        this.titulo = title;
        this.desc = description;
        this.qtd = amount;
      });
  }

  onCount(tipo: number): number {
    if (tipo === 0 && this.count !== 0) {
      this.count--;
    } else if (tipo === 1) {
      this.count++;
    }
    return this.count;
  }

  async onSubmit(): Promise<void> {
    const result = this.qtd - this.count;
    const loading = await this.overlayService.loading({
      message: 'Saving...'
    });
    try {
      const request = await this.requestsService.update({
        id: this.requestId,
        title: this.titulo,
        description: this.desc,
        amount: result
      });
      this.navCtrl.navigateBack('/requests');
    } catch (error) {
      console.log('Error update Amount: ', error);
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
