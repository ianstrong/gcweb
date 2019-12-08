import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-faculty-header',
  templateUrl: './faculty-header.component.html',
  styleUrls: ['./faculty-header.component.scss']
})
export class FacultyHeaderComponent implements OnInit {

  credAdmin: any = {};

  constructor(private router: Router) { }

  ngOnInit() {
    this.credAdmin = JSON.parse(localStorage.getItem('gcweb_faculty'));
  }


  logout() {
    Swal.fire({
      title: 'Log Out',
      icon: 'warning',
      text:
        'You are about to leave this portal?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText:
        'Proceed',
      cancelButtonText:
        'Cancel'
    }).then((res) => {
      if (res.value) {
        localStorage.removeItem('gcweb_faculty');
        this.router.navigate(['/login']);
      }
    });
  }
}
