import { Component, OnInit } from "@angular/core";
import {FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  form: FormGroup;

  insuranceType = 'Home Insurance';

  places = [
    {value: 'kitchener', viewValue: 'Kitchener'},
    {value: 'toronto', viewValue: 'Toronto'},
    {value: 'montreal', viewValue: 'Montreal'},
    {value: 'ottawa', viewValue: 'Ottawa'}
  ];

  daysInMonth: number[];
  now: Date;

  // display next 5 years from now
  years: number[] = Array(5).fill(0).map((x, i) => i + (new Date().getFullYear()));
  months = [
    {value: 1, viewValue: 'January'},
    {value: 2, viewValue: 'February'},
    {value: 3, viewValue: 'March'},
    {value: 4, viewValue: 'April'},
    {value: 5, viewValue: 'May'},
    {value: 6, viewValue: 'June'},
    {value: 7, viewValue: 'July'},
    {value: 8, viewValue: 'August'},
    {value: 9, viewValue: 'September'},
    {value: 10, viewValue: 'October'},
    {value: 11, viewValue: 'November'},
    {value: 12, viewValue: 'December'}
  ];

  propertyKinds = {
    own: [
      'Home',
      'Condo',
      'Seasonal',
      'Rental Dwelling',
      'Mobile Home',
    ],
    rent: [
      'Tenant',
      'Storage'
    ]
  };

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.now = new Date();
    this.form = this.fb.group({
      location: '',
      ownershipStatus: 'own', //debug
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: null,
      coverageStart: this.fb.group({
        year: this.now.getFullYear(),
        // month indexed from 1 (January is 1, February is 2, etc.)
        month: this.now.getMonth() + 1,
        day: this.now.getDate(),
      }),
      propertyKind: '',
      isPrimaryResidence: null,
      secondaryResidenceOrConstruction: '',
      isVacant: null,
      vacancy: this.fb.group({
        duration: '',
        reason: '',
      }),
      hasMadeClaim: null,
      claims: this.fb.array([this.buildClaim()]),
    });

    this.daysInMonth = Array(this.getDaysInMonth()).fill(0).map((x, i) => i + 1);
  }
  getDaysInMonth(): number {
    return (new Date(this.form.value.coverageStart.year, this.form.value.coverageStart.month, 0)).getDate();
  }
  updateDaysInMonth(): void {
    this.daysInMonth = Array(this.getDaysInMonth()).fill(0).map((x, i) => i + 1);
    if (this.form.value.coverageStart.day > this.getDaysInMonth()) {
      this.form.value.coverageStart.day = null;
    }
  }
  getFormField(key: string) {
    return this.form.get(key).value;
  }
  clearFormField(key: string): void {
    this.form.patchValue({[key]: null});

  }

  get claims(): FormArray{
    return <FormArray>this.form.get('claims')
  }
  buildClaim(): FormGroup {
    return this.fb.group({
      event: '',
      date: null
    });
  }
  addClaim(): void {
    this.claims.push(this.buildClaim());
  }
  removeClaim(i: number): void {
    this.claims.removeAt(i);
  }

  shouldShowField(key: string): boolean {
    if (key === 'primaryResidenceQuestion') {
      return this.handleShouldShowField(
        this.form.value.ownershipStatus === 'own',
        () => (this.form.patchValue({isPrimaryResidence: null}))
      );
    } else if (key === 'secondaryOrConstructionQuestion') {
      return this.handleShouldShowField(
        this.form.value.isPrimaryResidence === false,
        () => (this.form.patchValue({secondaryResidenceOrConstruction: null}))
      );
    } else if (key === 'isVacantQuestion') {
      return this.handleShouldShowField(
        this.form.value.isPrimaryResidence === true || this.form.value.secondaryResidenceOrConstruction === 'Secondary',
        () => (this.form.patchValue({isVacant: null}))
      );
    } else if (key === 'vacancyDetailsQuestion') {
      return this.handleShouldShowField(
        this.form.value.isVacant === true,
        () => (this.form.value.vacancy.duration = this.form.value.vacancy.reason = null)
      );
    }
  }
  handleShouldShowField (condition: boolean, hideCallback: Function): boolean {
    if (condition) {
      return true;
    }
    hideCallback();
    return false;
  }
  log(s) {
    console.log(s);
  }
  debug() {
    console.log(JSON.stringify(this.form.value, null, 2));
  }

}
