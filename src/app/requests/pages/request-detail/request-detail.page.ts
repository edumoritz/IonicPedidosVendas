import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';

import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.page.html',
  styleUrls: ['./request-detail.page.scss']
})
export class RequestDetailPage {
  requestForm: FormGroup;
  titulo = '';
  desc = '';
  qtd = 0;
  count = 0;

  constructor(private requestsService: RequestsService, private route: ActivatedRoute) {}

  ionViewDidEnter(): void {
    const requestId = this.route.snapshot.paramMap.get('id');
    console.log(requestId);
    this.requestsService
      .get(requestId)
      .pipe(take(1))
      .subscribe(({ title, description, amount }) => {
        this.titulo = title;
        this.desc = description;
        this.qtd = amount;
      });
  }

  onAmount(tipo: number, index: string): number {
    if (tipo === 0 && this.count !== 0) {
      this.count--;
    } else if (tipo === 1) {
      this.count++;
    }

    return this.count;
  }

  onBuy(value: number): void {}
}
