import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css', '../wizard.component.css'],
})
export class PropertyFormComponent {
  @Input() ownershipStatus: string;

  form: FormGroup;

  readonly propertyKinds = {
    own: ['Home', 'Condo', 'Seasonal', 'Rental Dwelling', 'Mobile Home'],
    rent: ['Tenant', 'Storage'],
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      propertyKind: null,
      isPrimaryResidence: null,
      secondaryResidenceOrConstruction: '',
      isVacant: null,
      vacancy: this.fb.group({
        duration: null,
        reason: null,
      }),
    });
  }

  get updatedPropertyKinds(): string[] {
    const selected = this.form.get('propertyKind');
    const options: string[] = this.propertyKinds[this.ownershipStatus];
    // Reset the propertyKind form control if it is not a vaid option given the ownershipStatus
    if (selected.value !== null && !options.includes(selected.value)) {
      selected.reset();
    }
    return options;
  }

  shouldShowField(key: string): boolean {
    if (key === 'primaryResidenceQuestion') {
      return this.handleShouldShowField(
        this.ownershipStatus === 'own',
        () => (
          this.form.patchValue({ isPrimaryResidence: null }),
          this.form.get('isPrimaryResidence').clearValidators(),
          this.form.get('isPrimaryResidence').updateValueAndValidity()
        )
      );
    } else if (key === 'secondaryOrConstructionQuestion') {
      return this.handleShouldShowField(
        this.form.get('isPrimaryResidence').value === false,
        () =>
          this.form.patchValue({
            secondaryResidenceOrConstruction: null
          })
      );
    } else if (key === 'isVacantQuestion') {
      return this.handleShouldShowField(
        this.form.get('isPrimaryResidence').value === true ||
        this.form.get('secondaryResidenceOrConstruction').value ===
        'Secondary',
        () => (
          this.form.patchValue({ isVacant: null }),
          this.form.get('isVacant').clearValidators(),
          this.form.get('isVacant').updateValueAndValidity()
        )
      );
    } else if (key === 'vacancyDetailsQuestion') {
      return this.handleShouldShowField(
        this.form.get('isVacant').value === true,
        () => (
          (this.form.value.vacancy.duration = this.form.value.vacancy.reason = null),
          this.form.get('vacancy.duration').clearValidators(),
          this.form.get('vacancy.reason').clearValidators(),
          this.form.get('vacancy.duration').updateValueAndValidity(),
          this.form.get('vacancy.reason').updateValueAndValidity()
        )
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
}
