import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from 'src/app/core/services/auth.service';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Request } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsService extends Firestore<Request> {
  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/users/${user.uid}/requests`);
        return;
      }
      this.setCollection(null);
    });
  }
}
