import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css', '../wizard.component.css'],
})
export class BasicFormComponent {
  readonly locations = ['Kitchener', 'Montreal', 'Toronto', 'Vancouver'];
  readonly now: Date = new Date();
  // display next 5 years from now
  readonly years: number[] = Array(5)
    .fill(0)
    .map((x, i) => i + new Date().getFullYear());
  readonly months: { value: number; name: string }[] = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ];
  readonly form: FormGroup = this.fb.group({
    location: ['', Validators.required],
    ownershipStatus: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dob: [null, Validators.required],
    coverageStart: this.fb.group({
      // default coverage start date is today
      year: this.now.getFullYear(),
      // month indexed from 1 (January is 1, February is 2, etc.)
      month: this.now.getMonth() + 1,
      day: this.now.getDate(),
    }),
  });

  constructor(private fb: FormBuilder) {}

  get ownOrRent(): string {
    return this.form.get('ownershipStatus').value;
  }

  get daysInMonth(): number[] {
    return Array(this.numDaysInMonths)
      .fill(0)
      .map((x, i) => i + 1);
  }

  checkDayIsValid(): void {
    if (this.form.get('coverageStart.day').value > this.numDaysInMonths) {
      this.form.get('coverageStart').patchValue({ day: null });
    }
  }

  private get numDaysInMonths(): number {
    return new Date(
      this.form.value.coverageStart.year,
      this.form.value.coverageStart.month,
      0
    ).getDate();
  }
}
