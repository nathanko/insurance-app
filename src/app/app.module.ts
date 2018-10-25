import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatCardModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatExpansionModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { WizardComponent } from './wizard/wizard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BasicFormComponent } from './wizard/basic-form/basic-form.component';
import { StepActionBarComponent } from './wizard/step-action-bar/step-action-bar.component';
import { PropertyFormComponent } from './wizard/property-form/property-form.component';
import { ClaimsFormComponent } from './wizard/claims-form/claims-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WizardComponent,
    HomepageComponent,
    NotFoundComponent,
    BasicFormComponent,
    StepActionBarComponent,
    PropertyFormComponent,
    ClaimsFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
