import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-facultymembers',
  templateUrl: './admin-facultymembers.component.html',
  styleUrls: ['./admin-facultymembers.component.scss']
})
export class AdminFacultymembersComponent implements OnInit {

  facMembers: any = {};
  facInfo: any = {};
  facInfoSingle: any = {};
  credAdmin: any = {};
  prospectusInfo: any = {};
  courses: any = {};

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.credAdmin = JSON.parse(localStorage.getItem('gcweb_admin'));
    this.getFac();
    this.getCourse();
  }

  viewInfo(i) {
    this.facInfoSingle = this.facMembers.data[i];
  }


  getFac() {
    this.ds.sendRequest('getFaculty', this.credAdmin).subscribe((res) => {
      this.facMembers = res;
    });
  }

  delFac(empNo) {
    this.facInfo.empNo = empNo;
    this.ds.sendRequest('delFaculty', this.facInfo ).subscribe((res) => {
      console.log(res);
      if ( res.status.remarks) {
        Swal.fire({ title: 'Success!' , text: 'Record deleted.', icon: 'success' }).then(() => {
          this.getFac();
        });
      }
    });
  }

  addFac(e) {
    e.preventDefault();
    this.facInfo.empNo = e.target[0].value;
    this.facInfo.empFname = e.target[1].value;
    this.facInfo.empMname = e.target[2].value;
    this.facInfo.empLname = e.target[3].value;
    this.facInfo.empEname = e.target[4].value;
    this.facInfo.empType = e.target[5].value;
    this.facInfo.empProgram = e.target[6].value;
    this.facInfo.empDept = this.credAdmin.data[0].fa_department;

    this.ds.sendRequest('addFaculty', this.facInfo ).subscribe((res) => {
      if (res.status.remarks) {
        Swal.fire({ title: 'Success!' , text: res.status.message , icon: 'success' }).then(() => {
          this.getFac();

          e.target[0].value = '';
          e.target[1].value = '';
          e.target[2].value = '';
          e.target[3].value = '';
          e.target[4].value = '';
        });
      } else {
        Swal.fire({ title: 'Failed!' , text: res.status.message , icon: 'error' });
      }
    });
  }

  uploadFac(e) {
    console.log(e);
    e.preventDefault();
    const fd = new FormData();
    fd.append('file', e.target[0].files[0], e.target[0].files[0].name);

    this.ds.sendRequestWithFile('uploadFaculty', fd).subscribe((res) => {
      if (res.status.remarks) {
        Swal.fire({ title: 'Success!' , text: res.status.message , icon: 'success' }).then(() => {
          this.getFac();
        });
      } else {
        Swal.fire({ title: 'Failed!' , text: res.status.message , icon: 'error' });
      }
    });
  }

  getCourse() {
    this.prospectusInfo.deptName = this.credAdmin.data[0].fa_department;
    this.ds.sendRequest('getProspectusCourse', this.prospectusInfo).subscribe((res) => {
      this.courses = res;
    });
  }

}
