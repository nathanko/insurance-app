import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-step-action-bar',
  templateUrl: './step-action-bar.component.html',
  styleUrls: ['./step-action-bar.component.css'],
})
export class StepActionBarComponent {
  @Input()
  form: FormGroup;

  @Input()
  isDebugMode: boolean;

  @Input()
  hasPrevious = true;

  @Input()
  nextText = 'Next';

  constructor(private api: ApiService) {}

  debug() {
    if (this.isDebugMode) {
      console.log(this.form);
      console.log(JSON.stringify(this.form.value, null, 2));
    }
  }

  submitForm() {
    if (this.form.valid) {
      this.api.postForm(this.form.value);
    } else {
      console.warn('Form has invalid status! Not submitted.');
    }
  }
}
