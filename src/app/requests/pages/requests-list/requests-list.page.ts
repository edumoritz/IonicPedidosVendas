import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Request } from '../../models/request.model';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.page.html',
  styleUrls: ['./requests-list.page.scss']
})
export class RequestsListPage {
  requests$: Observable<Request[]>;

  constructor(private requestsService: RequestsService) {}

  ionViewDidEnter(): void {
    this.requests$ = this.requestsService.getAll();
  }
}
