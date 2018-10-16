import { Component, OnInit } from "@angular/core";
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  basicInfoFg: FormGroup;

  insuranceType = 'Home Insurance';

  places = [
    {value: 'kitchener', viewValue: 'Kitchener'},
    {value: 'toronto', viewValue: 'Toronto'},
    {value: 'montreal', viewValue: 'Montreal'},
    {value: 'ottawa', viewValue: 'Ottawa'}
  ];

  daysInMonth: number[];
  private now: Date;

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

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.now = new Date();
    this.basicInfoFg = this.fb.group({
      location: null,
      ownershipStatus: '',
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: null,
      coverageStart: this.fb.group({
        year: this.now.getFullYear(),
        // month indexed from 1 (January is 1, February is 2, etc.)
        month: this.now.getMonth() + 1,
        day: this.now.getDate(),
      })
    });

    this.daysInMonth = Array(this.getDaysInMonth()).fill(0).map((x, i) => i + 1);
  }
  getDaysInMonth(): number {
    return (new Date(this.basicInfoFg.value.coverageStart.year, this.basicInfoFg.value.coverageStart.month, 0)).getDate();
  }
  updateDaysInMonth(): void {
    this.daysInMonth = Array(this.getDaysInMonth()).fill(0).map((x, i) => i + 1);
    if (this.basicInfoFg.value.coverageStart.day > this.getDaysInMonth()) {
      this.basicInfoFg.value.coverageStart.day = null;
    }
  }
  log(s) {
    console.log(s);
  }
  debug() {
    console.log(this.basicInfoFg.value);
  }

}
