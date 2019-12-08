import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { FacultyLayoutComponent } from './faculty/faculty-layout/faculty-layout.component';
import { StudentLayoutComponent } from './student/student-layout/student-layout.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'admin',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './admin/admin.module#AdminModule'
    }]
  },
  { path: 'faculty',
    component: FacultyLayoutComponent,
    children: [{
      path: '',
      loadChildren: './faculty/faculty.module#FacultyModule'
    }]
  },
  { path: 'student',
    component: StudentLayoutComponent,
    children: [{
      path: '',
      loadChildren: './student/student.module#StudentModule'
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
