import { ChangeDetectorRef, Component, OnDestroy, Inject, ElementRef, OnInit, HostListener} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public innerWidth: any;
  showvid = true;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth)
    if(this.innerWidth < 1280){
    this.showvid = false
  } else{
    this.showvid = true
  }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
  if(this.innerWidth < 1280){
    this.showvid = false
  } else{
    this.showvid = true
  }
  console.log(this.innerWidth+' changed')
}

}
