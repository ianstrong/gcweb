import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfilyComponent } from './profily/profily.component';
import {  CahsnewComponent } from './cahsnew/cahsnew.component';
import {  CahsoldComponent } from './cahsold/cahsold.component';
import { CbanewComponent  } from './cbanew/cbanew.component';
import { CbaoldComponent  } from './cbaold/cbaold.component';
import { CcsnewComponent  } from './ccsnew/ccsnew.component';
import { CcsoldComponent  } from './ccsold/ccsold.component';
import { CeasnewComponent  } from './ceasnew/ceasnew.component';
import { CeasoldComponent  } from './ceasold/ceasold.component';
import { ChtmnewComponent  } from './chtmnew/chtmnew.component';
import { ChtmoldComponent  } from './chtmold/chtmold.component';
import { from } from 'rxjs';


const routes: Routes = [
  {path: '', redirectTo: './', pathMatch: 'full' },
  {path: './', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'enlistment', component: ProfilyComponent},
  {path: 'cahsprofiling', component: CahsnewComponent},
  {path: 'cahsenlistment', component: CahsoldComponent},
  {path: 'cbaprofiling', component: CbanewComponent},
  {path: 'cbaenlistment', component: CbaoldComponent},
  {path: 'ccsprofiling', component: CcsnewComponent},
  {path: 'ccsenlistment', component: CcsoldComponent},
  {path: 'ceasprofiling', component: CeasnewComponent},
  {path: 'ceasenlistment', component: CeasoldComponent},
  {path: 'chtmprofiling', component: ChtmnewComponent},
  {path: 'chtmenlistment', component: ChtmoldComponent},

]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
