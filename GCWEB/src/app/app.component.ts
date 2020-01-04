/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, Inject, ElementRef} from '@angular/core';
import { SE } from './directives/scroll.directive';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { DOCUMENT } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { ClickOutsideDirective } from 'ng-click-outside';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {

  onClickedOutside(e: Event) {
    console.log('Clicked outside:', e);
  }
  showAboutNav = false;
  showAcadNav = false;
  showStudentNav = false;
  target;

  contactFabButton: any;
  bodyelement: any;
  sidenavelement: any;

  isActive = false;
  isActivefadeInDown = true;
  fixedTolbar = true;

	mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(@Inject(DOCUMENT) document, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog, private _eref: ElementRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    console.log(this.mobileQuery.matches)
  }

  public detectScroll(event: SE) {
    
    if (event.header) {
      this.isActive = false;
      this.isActivefadeInDown = true;
      this.fixedTolbar = true;
    }
    
    if (event.bottom) {
      this.isActive = true;
      this.isActivefadeInDown  = false;
      this.fixedTolbar = false;
    }
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '500px'
    });
  }

  setToggleOn(){

    this.bodyelement = document.getElementById('nglpage');
    this.bodyelement.classList.add("scrollOff");
    this.contactFabButton = document.getElementById('contact-fab-button');
    this.contactFabButton.style.display = "none";
    
  }

  setToggleOff(){
    
    this.bodyelement = document.getElementById('nglpage');
    this.bodyelement.classList.remove("scrollOff");
    this.contactFabButton = document.getElementById('contact-fab-button');
    this.contactFabButton.removeAttribute("style");

  }

  toggleAboutNav(){
    this.showAboutNav = !this.showAboutNav;
    this.closeAcadNav()
    this.closeStudentNav()

  }

  toggleAcadNav(){
    this.showAcadNav = !this.showAcadNav
    this.closeAboutNav()
    this.closeStudentNav()
  }

  toggleStudentNav(){
    this.showStudentNav = !this.showStudentNav
    this.closeAboutNav()
    this.closeAcadNav()
  }

  closeAboutNav(){
    this.showAboutNav = false;
    
  }

  closeAcadNav(){
    this.showAcadNav = false;
  }

  closeStudentNav(){
    this.showStudentNav = false
  }

  closeAll(){
    this.closeAboutNav()
    this.closeAcadNav()
    this.closeStudentNav()
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}