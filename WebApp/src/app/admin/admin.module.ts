import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminFacultymembersComponent } from './component/admin-facultymembers/admin-facultymembers.component';
import { AdminSubjectprospectusComponent } from './component/admin-subjectprospectus/admin-subjectprospectus.component';
import { DataService } from '../services/data.service';
import { AdminClassesComponent } from './component/admin-classes/admin-classes.component';


@NgModule({
  declarations: [
    AdminFacultymembersComponent,
    AdminSubjectprospectusComponent,
    AdminClassesComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  providers: [
    DataService
  ]
})
export class AdminModule { }
