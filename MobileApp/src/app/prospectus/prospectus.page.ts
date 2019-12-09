import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-prospectus',
  templateUrl: './prospectus.page.html',
  styleUrls: ['./prospectus.page.scss'],
})
export class ProspectusPage implements OnInit {

  studentInfo: any = {};
  prospectus: any = {};
  constructor(private ds: DataService, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('studentInfo').then((val) => {
      console.log(val.si_idnumber);

      this.studentInfo.si_idnumber  = val.si_idnumber;
      this.studentInfo.si_course = val.si_course;

      this.ds.sendrequest('getProspectusCopy', this.studentInfo).subscribe((res) => {
        this.prospectus = res;
        console.log(this.prospectus);
      });
    });
  }
}
