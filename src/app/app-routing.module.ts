import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WizardComponent } from './wizard/wizard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'apply', component: WizardComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
