import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.scss']
})
export class AdminClassesComponent implements OnInit {

  classInfo: any = {};
  show = false;

  constructor(private ds: DataService) { }

  ngOnInit() {
  }

  addClass(e) {

  }

  uploadClass(e) {
    this.ds.sendRequestWithFile('uploadClass', this.classInfo).subscribe((res) => {

    });
  }
}
