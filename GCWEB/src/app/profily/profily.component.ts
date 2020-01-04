import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profily',
  templateUrl: './profily.component.html',
  styleUrls: ['./profily.component.css']
})
export class ProfilyComponent implements OnInit {
department = "gc"
deptlogo = "./assets/logo/logo_gc.png"
selectedgc = true
navigateNew = "/home"
navigateOld = "/home"
  constructor() { }

  ngOnInit() {
  }

  onChange(dep){
    this.deptlogo = "./assets/logo/logo_"+dep+".png"
    if(dep!='gc'){
      this.selectedgc = false;
    } else{
      this.selectedgc = true;
    }
    this.navigateNew = "/"+dep+"profiling";
    this.navigateOld = "/"+dep+"enlistment";
  }
}
