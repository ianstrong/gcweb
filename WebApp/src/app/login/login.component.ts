import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginCredentials: any = {};
  credAdmin: any = {};
  credFaculty: any = {};
  credStudent: any = {};

  constructor(private ds: DataService, private router: Router) { }

  ngOnInit() {

    this.credAdmin = JSON.parse(localStorage.getItem('gcweb_admin'));
    this.credFaculty = JSON.parse(localStorage.getItem('gcweb_faculty'));
    this.credStudent = JSON.parse(localStorage.getItem('gcweb_student'));

    if ( this.credAdmin !== null ) {
      this.ds.sendRequest('checkAdmin', this.credAdmin).subscribe((res) => {
        if (res.status.remarks) {
          this.router.navigate(['admin']);
        } else {
          localStorage.removeItem('gcweb_admin');
        }
      });
    } else if ( this.credFaculty !== null ) {
      this.ds.sendRequest('checkFaculty', this.credFaculty).subscribe((res) => {
        if (res.status.remarks) {
          this.router.navigate(['faculty']);
        } else {
          localStorage.removeItem('gcweb_faculty');
        }
      });
    } else if ( this.credStudent !== null ) {
      this.ds.sendRequest('checkStudent', this.credStudent).subscribe((res) => {
        if (res.status.remarks) {
          this.router.navigate(['student']);
        } else {
          localStorage.removeItem('gcweb_student');
        }
      });
    }

  }


  logIn(e) {
    e.preventDefault();

    if (e.target[2].value !== '0') {
      this.loginCredentials.username = e.target[0].value;
      this.loginCredentials.password = e.target[1].value;

      switch ( e.target[2].value) {
        case '1':
          this.ds.sendRequest('loginAdmin', this.loginCredentials).subscribe((res) => {
            if (res.status.remarks) {
              Swal.fire({
                icon: 'success',
                title: 'Login success!',
                text: 'User verification success. Please proceed.'
              }).then(() => {
                localStorage.setItem('gcweb_admin', JSON.stringify(res));
                this.router.navigate(['admin']);
              });
            } else {
              this.failedLogin();
            }
          });
          break;

        case '2':
          this.ds.sendRequest('loginFaculty', this.loginCredentials).subscribe((res) => {
            if (res.status.remarks) {
              Swal.fire({
                icon: 'success',
                title: 'Login success!',
                text: 'User verification success. Please proceed.'
              }).then(() => {
                localStorage.setItem('gcweb_faculty', JSON.stringify(res));
                this.router.navigate(['faculty']);
              });
            } else {
              this.failedLogin();
            }
          });
          break;

        case '3':
          this.ds.sendRequest('loginStudent', this.loginCredentials).subscribe((res) => {
            if (res.status.remarks) {
              Swal.fire({
                icon: 'success',
                title: 'Login success!',
                text: 'User verification success. Please proceed.'
              }).then(() => {
                localStorage.setItem('gcweb_student', JSON.stringify(res));
                this.router.navigate(['student']);
              });
            } else {
              this.failedLogin();
            }
          });
          break;
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete',
        text: 'Please select your account type.'
      });
    }
  }


  failedLogin() {
    Swal.fire({
      icon: 'error',
      title: 'Login failed!',
      text: 'User verification failed. Invalid username or password.'
    });
  }
}


