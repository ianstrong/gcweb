import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProspectusPage } from './prospectus.page';

const routes: Routes = [
  {
    path: '',
    component: ProspectusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProspectusPageRoutingModule {}
