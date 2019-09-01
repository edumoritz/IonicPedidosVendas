import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Request } from '../../models/request.model';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.page.html',
  styleUrls: ['./request-detail.page.scss']
})
export class RequestDetailPage {
  requests$: Observable<Request[]>;
  count = 0;

  constructor(private requestsService: RequestsService) {}

  ionViewDidEnter(): void {
    this.requests$ = this.requestsService.getAll();
  }

  onAmount(tipo: number): void {
    if (tipo === 0 && this.count !== 0) {
      this.count = this.count - 1;
    } else if (tipo === 1) {
      this.count = this.count + 1;
    }
  }
}
