import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faculty-footer',
  templateUrl: './faculty-footer.component.html',
  styleUrls: ['./faculty-footer.component.scss']
})
export class FacultyFooterComponent implements OnInit {
  test: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
