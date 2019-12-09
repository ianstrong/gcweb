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
  credAdmin: any = {};
  show: boolean;

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.show = false;
    this.credAdmin = JSON.parse(localStorage.getItem('gcweb_admin'));
    this.getCourse();
  }

  getProspectus(e) {
    this.prospectusInfo.courseName = e;
    this.ds.sendRequest('getProspectusInfo', this.prospectusInfo).subscribe((res) => {
      console.log(res);
    });
  }


  getCourse() {
    this.prospectusInfo.deptName = this.credAdmin.data[0].fa_department;
    this.ds.sendRequest('getProspectusCourse', this.prospectusInfo).subscribe((res) => {
      this.courses = res;
    });
  }

  getCY(e) {
    this.show = false;
    this.prospectusInfo.courseName = e.target.value;
    this.ds.sendRequest('getProspectusCy', this.prospectusInfo).subscribe((res) => {
      this.curriculumYear = res;
    });
  }

  getSubjects(e) {
    this.prospectusInfo.syCy = e.target.value;
    this.ds.sendRequest('getProspectus', this.prospectusInfo).subscribe((res) => {
      this.subjects = res;
      this.show = true;
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

  editSubject(e) {
    this.prospectusInfo.recNo = e.su_recno;
    this.prospectusInfo.suCode = e.su_code;
    this.prospectusInfo.suDesc = e.su_description;
    this.prospectusInfo.suLecu = e.su_lecunits;
    this.prospectusInfo.suLabu = e.su_labunits;
    this.prospectusInfo.suRleu = e.su_rleunits;
    this.prospectusInfo.suPre = e.su_prereq;
    this.prospectusInfo.suSem = e.su_sem;
    this.prospectusInfo.suYear = e.su_yrlevel;
    this.prospectusInfo.suCy = e.su_cy;
    this.prospectusInfo.suCourse = e.su_course;

  }

  updateProspectus(e) {
    e.preventDefault();
    this.ds.sendRequest('updateProspectus', this.prospectusInfo).subscribe((res) => {
      if (res.status.remarks) {
        Swal.fire({ title: 'Success!' , text: res.status.message , icon: 'success' });
        this.show = false;
      } else {
        Swal.fire({ title: 'Failed!' , text: res.status.message , icon: 'error' });
      }
    });
  }
}
