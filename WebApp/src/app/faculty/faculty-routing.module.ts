import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacultySchedComponent } from './component/faculty-sched/faculty-sched.component';
import { FacultyMystudentsComponent } from './component/faculty-mystudents/faculty-mystudents.component';
import { FacultyProfileComponent } from './component/faculty-profile/faculty-profile.component';
import { FacultyProfileyComponent } from './component/faculty-profiley/faculty-profiley.component';


const routes: Routes = [
  { path : '' , redirectTo: 'myclasses', pathMatch: 'full'},
  { path : 'myclasses', component: FacultySchedComponent },
  { path : 'mystudents', component: FacultyMystudentsComponent },
  { path : 'myprofile', component: FacultyProfileComponent },
  { path : 'profiley', component: FacultyProfileyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FacultyRoutingModule { }
