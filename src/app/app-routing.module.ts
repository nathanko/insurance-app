import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WizardComponent } from './wizard/wizard.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'apply', component: WizardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
