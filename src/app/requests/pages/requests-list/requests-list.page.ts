import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Request } from '../../models/request.model';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.page.html',
  styleUrls: ['./requests-list.page.scss']
})
export class RequestsListPage implements OnInit {
  requests$: Observable<Request[]>;

  constructor() {}

  ngOnInit(): void {
    this.requests$ = of([
      { id: 'fdssvsdvds', title: 'Camiseta Preta', description: '', amount: 5 },
      { id: 'fdssvsdvds', title: 'Camiseta Branca', description: '', amount: 3 }
    ]);
  }
}
