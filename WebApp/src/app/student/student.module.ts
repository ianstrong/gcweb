import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentProfileComponent } from './component/student-profile/student-profile.component';
import { StudentSchedComponent } from './component/student-sched/student-sched.component';
import { StudentProspectusComponent } from './component/student-prospectus/student-prospectus.component';


@NgModule({
  declarations: [StudentProfileComponent, StudentSchedComponent, StudentProspectusComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
