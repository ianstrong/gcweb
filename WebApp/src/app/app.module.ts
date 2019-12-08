import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

// for admin
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminSidebarComponent } from './admin/component/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from './admin/component/admin-header/admin-header.component';
import { AdminFooterComponent } from './admin/component/admin-footer/admin-footer.component';


// for faculty
import { FacultyLayoutComponent } from './faculty/faculty-layout/faculty-layout.component';
import { FacultyHeaderComponent } from './faculty/component/faculty-header/faculty-header.component';
import { FacultySidebarComponent } from './faculty/component/faculty-sidebar/faculty-sidebar.component';
import { FacultyFooterComponent } from './faculty/component/faculty-footer/faculty-footer.component';


// for student
import { StudentLayoutComponent } from './student/student-layout/student-layout.component';
import { StudentSidebarComponent } from './student/component/student-sidebar/student-sidebar.component';
import { StudentFooterComponent } from './student/component/student-footer/student-footer.component';
import { StudentHeaderComponent } from './student/component/student-header/student-header.component';



import { LoginComponent } from './login/login.component';
import { AdminModule } from './admin/admin.module';
import { FacultyModule } from './faculty/faculty.module';
import { StudentModule } from './student/student.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AdminSidebarComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    FacultyLayoutComponent,
    FacultyHeaderComponent,
    FacultySidebarComponent,
    FacultyFooterComponent,
    StudentLayoutComponent,
    StudentSidebarComponent,
    StudentFooterComponent,
    StudentHeaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    FacultyModule,
    StudentModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
