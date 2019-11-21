import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminFacultymembersComponent } from './component/admin-facultymembers/admin-facultymembers.component';
import { AdminSubjectprospectusComponent } from './component/admin-subjectprospectus/admin-subjectprospectus.component';


const routes: Routes = [
  { path : '' , redirectTo: 'facultymembers', pathMatch: 'full'},
  { path : 'facultymembers', component: AdminFacultymembersComponent },
  { path : 'subjectprospectus', component: AdminSubjectprospectusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
