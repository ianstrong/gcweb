import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  credAdmin: any = {};

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.credAdmin = JSON.parse(localStorage.getItem('gcweb_admin'));
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
        localStorage.removeItem('gcweb_admin');
        this.router.navigate(['/login']);
      }
    });
  }

}
