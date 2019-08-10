import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Request } from '../../models/request.model';

@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.scss']
})
export class RequestItemComponent {
  @Input() request: Request;
  @Output() done = new EventEmitter<Request>();
  @Output() update = new EventEmitter<Request>();
  @Output() delete = new EventEmitter<Request>();
}
