import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { RequestsService } from '../../services/requests.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-requests-save',
  templateUrl: './requests-save.page.html',
  styleUrls: ['./requests-save.page.scss']
})
export class RequestsSavePage implements OnInit {
  requestForm: FormGroup;
  pageTitle = '...';
  requestId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private requestsService: RequestsService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.init();
  }

  init(): void {
    const requestId = this.route.snapshot.paramMap.get('id');
    if (!requestId) {
      this.pageTitle = 'Criar Pedido';
      return;
    }
    this.requestId = requestId;
    this.pageTitle = 'Editar Pedido';
    this.requestsService
      .get(requestId)
      .pipe(take(1))
      .subscribe(({ title, description, amount }) => {
        this.requestForm.get('title').setValue(title);
        this.requestForm.get('description').setValue(description);
        this.requestForm.get('amount').setValue(amount);
      });
  }

  private createForm(): void {
    this.requestForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.minLength(10)],
      amount: ['', [Validators.required]]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Saving...'
    });
    try {
      const request = await this.requestsService.create(this.requestForm.value);
      console.log('Request created! ', request);
      this.navCtrl.navigateBack('/requests');
    } catch (error) {
      console.log('Error saving Request: ', error);
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
