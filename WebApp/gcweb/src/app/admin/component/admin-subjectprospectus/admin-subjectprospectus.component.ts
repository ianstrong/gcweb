import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-subjectprospectus',
  templateUrl: './admin-subjectprospectus.component.html',
  styleUrls: ['./admin-subjectprospectus.component.scss']
})
export class AdminSubjectprospectusComponent implements OnInit {

  prospectusInfo: any = {};
  courses: any = {};
  curriculumYear: any = {};
  subjects: any = {};


  constructor(private ds: DataService) { }

  ngOnInit() {
  }

  getProspectus(e) {
    this.prospectusInfo.courseName = e;
    this.ds.sendRequest('getProspectusInfo', this.prospectusInfo).subscribe((res) => {
      console.log(res);
    });
  }


  getCourse(e) {
    this.prospectusInfo.deptName = e.target.value;
    this.ds.sendRequest('getProspectusCourse', this.prospectusInfo).subscribe((res) => {
      this.courses = res;
    });
  }

  getCY(e) {
    this.prospectusInfo.courseName = e.target.value;
    this.ds.sendRequest('getProspectusCy', this.prospectusInfo).subscribe((res) => {
      this.curriculumYear = res;
    });
  }

  getSubjects(e) {
    this.prospectusInfo.syCy = e.target.value;
    this.ds.sendRequest('getProspectus', this.prospectusInfo).subscribe((res) => {
      this.subjects = res;
    });
  }


  uploadSubjects(e) {
    console.log(e);
    e.preventDefault();
    const fd = new FormData();
    fd.append('file', e.target[0].files[0], e.target[0].files[0].name);

    this.ds.sendRequestWithFile('uploadProspectus', fd).subscribe((res) => {
      if (res.status.remarks) {
        Swal.fire({ title: 'Success!' , text: res.status.message , icon: 'success' });
      } else {
        Swal.fire({ title: 'Failed!' , text: res.status.message , icon: 'error' });
      }
    });

  }
}
