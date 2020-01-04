import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public innerWidth: any;
  break = false
  constructor() { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth)
    if(this.innerWidth < 488){
      this.break = true
    } else{
      this.break = false
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
  if(this.innerWidth < 488){
    this.break= true
  } else{
    this.break = false
  }
  console.log(this.innerWidth+' changed')
}


  scrollToElement($element){
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
}
