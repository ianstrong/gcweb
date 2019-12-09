import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';

const authtoken = 'studentToken';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  authCredentials: any = {};
  authState = new BehaviorSubject(false);

  constructor(private storage: Storage,
              private platform: Platform,
              private ds: DataService) {
  }

  login(token) {
    return this.storage.set(authtoken, token).then(res => {
      this.authState.next(true);
    });
  }

  logout() {
    return this.storage.remove(authtoken).then(() => {
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  checkToken() {
    this.storage.get(authtoken).then(res => {
      this.authCredentials.token = res;
      this.ds.sendrequest('checkuser', this.authCredentials).subscribe(data => {
        console.log(data);
        if (data.status.remarks) {
          this.authState.next(true);
        }
      });
    });
  }

}
