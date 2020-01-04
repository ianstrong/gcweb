import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { StudentDialogComponent } from '../../../student-dialog/student-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-faculty-profiley',
  templateUrl: './faculty-profiley.component.html',
  styleUrls: ['./faculty-profiley.component.scss']
})
export class FacultyProfileyComponent implements OnInit {

  studInfo: any = {};
  searchInfo: any = {};
  actClasses: any = {};
  enClasses: any = {};
  courseBlocks: any = {};


  constructor(private ds: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.searchInfo.searchClass = '';
    this.getSettings();
  }

  studentList(){
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '80vw',
      height: '90vh'
    });
  }

  getSettings() {
    this.ds.sendRequest('getSettings', this.searchInfo).subscribe((res) => {
      this.searchInfo.actSem = res.data[0].en_sem;
      this.searchInfo.actSY = res.data[0].en_schoolyear;
      this.getActiveClasses();

    });
  }

  searchStudent(e) {
    e.preventDefault();
    this.searchInfo.idNumber = e.target[0].value;
    this.ds.sendRequest('getStudent', this.searchInfo).subscribe((res) => {
      if (res.status.remarks) {
        this.studInfo = res.data[0];
        this.getEnrolledClasses();
        this.getCourseBlocks();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Not Found',
          text: 'Invalid student number.'
        });
      }
    });
  }

  searchActiveClasses(e) {
    this.searchInfo.searchClass = e.target.value;
    this.getActiveClasses();
  }

  getActiveClasses() {
    this.ds.sendRequest('getActiveClasses', this.searchInfo).subscribe((res) => {
      this.actClasses = res;
    });
  }

  getEnrolledClasses() {
    this.ds.sendRequest('getEnrolledClasses', this.searchInfo).subscribe((res) => {
      this.enClasses = res;
    });
  }


  enrollSingleClass(i) {
    if (this.studInfo.si_idnumber == null || this.studInfo.si_idnumber === '') {
      Swal.fire({
        icon: 'error',
        title: 'Adding Failed',
        text: 'Undefined student information.'
      });
    } else {
      this.searchInfo.classCode = this.actClasses.data[i].cl_code;
      this.searchInfo.subjectCode = this.actClasses.data[i].cl_sucode;
      this.searchInfo.block = this.actClasses.data[i].cl_block;
      this.ds.sendRequest('enrollSingleClass', this.searchInfo).subscribe((res) => {
        if (res.status.remarks) {
          this.getEnrolledClasses();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Adding failed',
            text: res.status.message
          });
        }
      });
    }
  }

  removeEnrolledSubject(i) {
    this.searchInfo.recno = this.enClasses.data[i].es_recno;
    this.ds.sendRequest('removeEnrolledSubject', this.searchInfo).subscribe((res) => {
      if (res.status.remarks) {
        this.getEnrolledClasses();
      }
    });
  }

  getCourseBlocks() {
    this.ds.sendRequest('getCourseBlocks', this.studInfo).subscribe((res) => {
      this.courseBlocks = res;
    });
  }

  enrollByBlock(e) {
    console.log(e.target.value);
    this.studInfo.blockSelected = e.target.value;
    this.ds.sendRequest('enrollByBlock', this.studInfo).subscribe((res) => {
      this.getEnrolledClasses();
    });

  }

}
