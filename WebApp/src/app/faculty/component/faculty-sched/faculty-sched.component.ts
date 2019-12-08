import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-faculty-sched',
  templateUrl: './faculty-sched.component.html',
  styleUrls: ['./faculty-sched.component.scss']
})
export class FacultySchedComponent implements OnInit {

  userinfo: any = JSON.parse(localStorage.getItem('gcweb_faculty'));
  classinfo: any = {};
  classes: any = {};
  students: any = {};
  classIdModal = '';
  fileModal = '';

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.getClassType('normal');
  }

  getClassType(type) {
    this.userinfo.type = type;
    this.ds.sendRequest('getclassf', this.userinfo).subscribe((res) => {
      this.classes = res;
    });
  }

  getClassStudents(classId) {
    this.classIdModal = classId;
    this.classinfo.classId = classId;
    this.ds.sendRequest('getClassStudents', this.classinfo).subscribe((res) => {
      this.students = res;
      console.log(res);
    });
  }

  uploadGrades(e) {
    const fd = new FormData();
    e.preventDefault();
    console.log(e);

    fd.append('classId', e.target[0].value);
    fd.append('file', e.target[1].files[0], e.target[1].files[0].name);

    this.ds.sendRequestWithFile('uploadGrade', fd).subscribe((res) => {
      if (res.status.remarks) {
        Swal.fire({
          text: res.status.message,
          icon: 'success'
        }).then(() => {
          this.getClassStudents(e.target[0].value);
          this.fileModal = '';
        });
      } else {
        Swal.fire({
          text: res.status.message,
          icon: 'error'
        });
      }
    });
  }
}
