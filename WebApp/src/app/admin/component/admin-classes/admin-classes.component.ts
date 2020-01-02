import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.scss']
})
export class AdminClassesComponent implements OnInit {

  classInfo: any = {};
  schoolYear: any = {};
  sem: any = {};
  block: any = {};
  classes: any = {};
  show = false;
  selectSY: string;
  selectSem: string;
  selectBlock: string;

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.getSchoolYear();
  }

  getSchoolYear() {
    this.ds.sendRequest('getSchoolYear', null).subscribe((res) => {
      this.schoolYear = res;
    });
  }


  // step 1
  getSem(e) {
    this.sem.data = [];
    this.show = false;
    this.classInfo.SY = e.target.value;
    this.ds.sendRequest('getSem', this.classInfo).subscribe((res) => {
      this.sem = res;
    });
  }

  // step 2
  getBlocks(e) {
    this.block.data = [];
    this.show = false;
    this.classInfo.sem = e.target.value;
    this.ds.sendRequest('getBlocks', this.classInfo).subscribe((res) => {
      this.block = res;
    });
  }

  // step 3
  getClass(e) {
    this.classInfo.block = e.target.value;
    this.ds.sendRequest('getClass', this.classInfo).subscribe((res) => {
      if (res.status.remarks) {
        this.show = true;
        this.classes = res;
      }
    });
  }

  uploadClass(e) {
    const fd = new FormData();
    fd.append('file', e.target[0].files[0], e.target[0].files[0].name);

    this.ds.sendRequestWithFile('uploadClass', fd).subscribe((res) => {
      if (res.status.remarks) {
        Swal.fire({ title: 'Success!' , text: res.status.message , icon: 'success' });
      } else {
        Swal.fire({ title: 'Failed!' , text: res.status.message , icon: 'error' });
      }
    });
  }




  addClass(e) {

  }

  delClass() {

  }

  editClass() {

  }
}
