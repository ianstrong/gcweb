import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectivesModule } from './directives/directives.module';
import { Material2Module } from './material2.module';

import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AboutComponent } from './about/about.component';
import { HeadingComponent } from './heading/heading.component';
import { PricingComponent } from './pricing/pricing.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { CarouselComponent } from './carousel/carousel.component';
import { VmgComponent } from './vmg/vmg.component';
import { VideoComponent } from './video/video.component';
import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './news/news.component';
import { NumbersComponent } from './numbers/numbers.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { ProfilyComponent } from './profily/profily.component';
import { MatSelectModule } from '@angular/material';
import { CahsnewComponent } from './cahsnew/cahsnew.component';
import { CahsoldComponent } from './cahsold/cahsold.component';
import { CbanewComponent } from './cbanew/cbanew.component';
import { CbaoldComponent } from './cbaold/cbaold.component';
import { CcsnewComponent } from './ccsnew/ccsnew.component';
import { CcsoldComponent } from './ccsold/ccsold.component';
import { CeasnewComponent } from './ceasnew/ceasnew.component';
import { CeasoldComponent } from './ceasold/ceasold.component';
import { ChtmnewComponent } from './chtmnew/chtmnew.component';
import { ChtmoldComponent } from './chtmold/chtmold.component';
import { IgsnewComponent } from './igsnew/igsnew.component';
import { IgsoldComponent } from './igsold/igsold.component';
import { ShsnewComponent } from './shsnew/shsnew.component';
import { ShsoldComponent } from './shsold/shsold.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxCleaveDirectiveModule } from 'ngx-cleave-directive';


@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    AboutComponent,
    HeadingComponent,
    PricingComponent,
    BlogComponent,
    ContactComponent,
    ContactDialogComponent,
    CarouselComponent,
    VmgComponent,
    VideoComponent,
    FooterComponent,
    NewsComponent,
    NumbersComponent,
    ProfileComponent,
    HomeComponent,
    ProfilyComponent,
    CahsnewComponent,
    CahsoldComponent,
    CbanewComponent,
    CbaoldComponent,
    CcsnewComponent,
    CcsoldComponent,
    CeasnewComponent,
    CeasoldComponent,
    ChtmnewComponent,
    ChtmoldComponent,
    IgsnewComponent,
    IgsoldComponent,
    ShsnewComponent,
    ShsoldComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Material2Module,
    FlexLayoutModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ClickOutsideModule,
    MatSelectModule,
    MatStepperModule,
    MatRadioModule,
    HttpClientModule,
    MatCheckboxModule,
    NgxCleaveDirectiveModule
  ],
  providers: [],
  entryComponents: [ ContactDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
