import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedPageRoutingModule } from './sched-routing.module';

import { SchedPage } from './sched.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedPageRoutingModule
  ],
  declarations: [SchedPage]
})
export class SchedPageModule {}
