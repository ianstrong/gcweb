import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../services/data.service'
import { Data } from '@angular/router';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';



export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent {
  p: number = 1;
  students: any = {};
  searchInfo: any = {};
  constructor(
    private ds: DataService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}



  ngOnInit() {
    this.searchInfo.searchClass = '';
    this.getStudents();
  }
  searchActiveClasses(e) {
    this.searchInfo.searchClass = e.target.value;
    this.getStudents();
  }

  getStudents() {
    this.ds.sendRequest('allstudents', this.searchInfo).subscribe((res) => {
      this.students = res;
    });
  }

  edit(id){
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '80vw',
      data: { id: id },
    });
  }
}




