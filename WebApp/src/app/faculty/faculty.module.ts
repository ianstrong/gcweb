import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyRoutingModule } from './faculty-routing.module';
import { FacultySchedComponent } from './component/faculty-sched/faculty-sched.component';
import { FacultyMystudentsComponent } from './component/faculty-mystudents/faculty-mystudents.component';
import { FacultyProfileComponent } from './component/faculty-profile/faculty-profile.component';
import { FacultyProfileyComponent } from './component/faculty-profiley/faculty-profiley.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatTable,
  MatTableDataSource,
  MatPaginator,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';

@NgModule({
  declarations: [FacultySchedComponent, FacultyMystudentsComponent, FacultyProfileComponent, FacultyProfileyComponent],
  imports: [
    CommonModule,
    FacultyRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class FacultyModule { }
