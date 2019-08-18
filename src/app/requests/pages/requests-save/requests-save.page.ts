import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { RequestsService } from '../../services/requests.service';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-requests-save',
  templateUrl: './requests-save.page.html',
  styleUrls: ['./requests-save.page.scss']
})
export class RequestsSavePage implements OnInit {
  requestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private requestsService: RequestsService
  ) {}

  ngOnInit(): void {
    this.createForm();
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
