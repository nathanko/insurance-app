import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-claims-form',
  templateUrl: './claims-form.component.html',
  styleUrls: ['./claims-form.component.css', '../wizard.component.css'],
})
export class ClaimsFormComponent {
  readonly now = new Date();
  readonly form: FormGroup = this.fb.group({
    hasMadeClaim: null,
    claims: this.fb.array([this.buildClaim()]),
  });

  constructor(private fb: FormBuilder) {}

  get claims(): FormArray {
    return <FormArray>this.form.get('claims');
  }

  addClaim(): void {
    this.claims.push(this.buildClaim());
  }

  removeClaim(i: number): void {
    this.claims.removeAt(i);
  }

  shouldShowField(key: string): boolean {
    if (key === 'claimsList') {
      return this.handleShouldShowField(
        this.form.get('hasMadeClaim').value === true,
        () => {
          while (this.claims.length > 0) {
            this.removeClaim(0);
          }
          this.addClaim();
        }
      );
    }
  }

  private handleShouldShowField(
    condition: boolean,
    hideCallback?: Function
  ): boolean {
    if (condition) {
      return true;
    }
    if (hideCallback !== undefined) {
      hideCallback();
    }
    return false;
  }

  private buildClaim(): FormGroup {
    return this.fb.group({
      event: '',
      date: null,
    });
  }
}
