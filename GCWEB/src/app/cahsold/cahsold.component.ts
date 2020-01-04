import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DataService } from '../data-service.service';
import { studentClass } from '../data-schema'
import {Router} from '@angular/router';
import Cleave from 'cleave.js'
import Swal from 'sweetalert2'

export class NgLpErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-cahsold',
  templateUrl: './cahsold.component.html',
  styleUrls: ['./cahsold.component.css']
})
export class CahsoldComponent implements OnInit {

  student = new studentClass;
  isLinear = true;
  acadyear;
  sem;
  sup;
  continue;
  department: any = {};
  departmentall: any = {};
  idnum: any = {};
  courses = {};
  coursesall = {};
  isdisabled = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  asd=false
  reasonisother=true;
  reasonstudyisother=true;
  notScholar = true;
  notTransferee = true;
  showErrors1 = false;
  showErrors2 = false;
  showErrors3 = false;
  interestisother = true;
  talentisother = true;
  sportisother = true;
  current_selected: string;
  specialInterests = ['Science & Math', 'Games', 'Tech Hobbies', 'Sports'];
  talents = ['Dancing', 'Music/Singing', 'Drawing', 'Hosting'];
  sports = ['Basketball', 'Volleyball', 'Swimming', 'Arnis'];
  interests: any = {}
  talents1: any = {}
  sports1: any = {}
  govprojs: any = {}
  govprojisother=true;
  listahanchecked=true;
  cleave6
  age;
  x = 0;
  constructor(private _formBuilder: FormBuilder, private ds: DataService, private router: Router) { }

  ngOnInit() {
    this.ds.sendRequest('getSettings', '').subscribe((settings)=>{
      this.acadyear = settings.data[0].en_schoolyear;
      this.sem = settings.data[0].en_sem;
      switch (this.sem) {
        case '1':
          this.sup = 'st'
          break;
        case '2':
          this.sup = 'nd'
          break;
        case 'Mid Year':
          this.sup = '';
          break;
      
        default:
          break;
      }
    });
    this.department.dept='CCS';
    this.departmentall.dept='';

    this.ds.sendRequest('getCourses',this.department).subscribe((courseres)=>{
      this.courses=courseres.data;
    });

    this.ds.sendRequest('getCourses',this.departmentall).subscribe((courseres)=>{
      this.coursesall=courseres.data;
      console.log(courseres.data)
    });

    this.firstFormGroup = this._formBuilder.group({
      idnumber: ['', Validators.required],
      lname: ['', Validators.required],
      fname: ['', Validators.required],
      mname: ['', Validators.required],
      nameext: [''],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      currentyear: ['', Validators.required],
      currentsem: ['', Validators.required],
      continue: ['', Validators.required],
      reasonquit: [''],
      
    });
    this.secondFormGroup = this._formBuilder.group({
      course: ['', Validators.required],
      course2: [''],
      course3: [''],
      yrlevel: ['', Validators.required],
      sem: ['', Validators.required],
      regular: ['', Validators.required],
      reason: ['', Validators.required],
      reasonother: [''],
      reasonstudy: ['', Validators.required],
      reasonstudyother: [''],
      scholar: ['', Validators.required],
      scholartype: [''],
      sponsor: ['', Validators.required],
      sponsoroccupation: ['', Validators.required],
      transferee: ['', Validators.required],
      transfercourselevel: [''],
      mobile1: ['', Validators.required],
      email1: ['', [Validators.required, Validators.email]],
    });
    

    this.cleave6 = new Cleave(this.fifthFormGroup.controls.famincome,{
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      prefix: 'Php ',
      delimiter: ','
  });


  }

getInfo(){
  this.idnum.idNumber = this.firstFormGroup.value.idnumber
  this.ds.sendRequest('getStudent', this.idnum).subscribe((studentinfo)=>{
    console.log(studentinfo.data)
    if(studentinfo.data[0].si_isenlisted==1&&studentinfo.data[0].si_sem==this.sem){
      Swal.fire({
        icon: 'error',
        title: 'This student is already enlisted for this semester',
        text: ''
      }).then(() => {
        this.firstFormGroup.controls.idnumber.setValue('')
    });
    }else{
      Swal.fire({
        icon: 'success',
        title: 'WELCOME '+studentinfo.data[0].si_firstname+'!',
        text: ''
      }).then(() => {
        this.firstFormGroup.controls.lname.setValue(studentinfo.data[0].si_lastname)
        this.firstFormGroup.controls.fname.setValue(studentinfo.data[0].si_firstname)
        this.firstFormGroup.controls.mname.setValue(studentinfo.data[0].si_midname)
        this.firstFormGroup.controls.nameext.setValue(studentinfo.data[0].si_extname)
        this.firstFormGroup.controls.email.setValue(studentinfo.data[0].si_email)
        this.firstFormGroup.controls.mobile.setValue(studentinfo.data[0].si_mobile)
        this.firstFormGroup.controls.currentyear.setValue(studentinfo.data[0].si_yrlevel)
        this.firstFormGroup.controls.currentsem.setValue(studentinfo.data[0].si_sem)
        this.secondFormGroup.controls.course.setValue(studentinfo.data[0].si_course)
        this.secondFormGroup.controls.yrlevel.setValue(studentinfo.data[0].si_yrlevel)
        this.secondFormGroup.controls.sem.setValue(this.sem)
        this.secondFormGroup.controls.regular.setValue(studentinfo.data[0].si_isregular)
        this.secondFormGroup.controls.email1.setValue(studentinfo.data[0].si_email)
        this.secondFormGroup.controls.mobile1.setValue(studentinfo.data[0].si_mobile)
    });
    }
  })

}

computeAge(){
  var timeDiff = Math.abs(Date.now() - new Date(this.firstFormGroup.controls.dob.value).getTime());
  this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  if(this.age<5||this.age>100){
    alert('Invalid Birthdate!');
    this.firstFormGroup.controls.age.setValue('')
    this.firstFormGroup.controls.dob.setValue('')
  } else{
    this.firstFormGroup.controls.age.setValue(this.age)
  }
 
}
onSelection(e){
    // console.log(this.thirdFormGroup.controls.interests.value.toString())
    // console.log(this.thirdFormGroup.controls.talents.value)
    // console.log(this.thirdFormGroup.controls.sports.value)
  switch(e){
    case 'interest' : 
    this.interests = this.thirdFormGroup.controls.interest.value;
      if(this.interests[this.interests.length-1]=="Others"){
        this.interestisother=false
      } else{
        this.interestisother=true
        this.thirdFormGroup.controls.interestother.setValue('')
      }
      break;
    case 'talent': 
    this.talents1 = this.thirdFormGroup.controls.talent.value;
      if(this.talents1[this.talents1.length-1]=="Others"){
        this.talentisother=false
      } else{
        this.talentisother=true
        this.thirdFormGroup.controls.talentother.setValue('')
      }
      break;
    case 'sport':
        this.sports1 = this.thirdFormGroup.controls.sport.value;
        if(this.sports1[this.sports1.length-1]=="Others"){
          this.sportisother=false
        } else{
          this.sportisother=true
          this.thirdFormGroup.controls.sportother.setValue('')
        }
      break;
    case 'govproj':
          this.x = 0;
          this.govprojs = this.fifthFormGroup.controls.govproj.value;
          console.log(this.govprojs)
          if(this.govprojs[this.govprojs.length-1]=="Others"){
            this.govprojisother=false
          } else{
            this.govprojisother=true
            this.fifthFormGroup.controls.govprojother.setValue('')
          }
          while(this.x<this.govprojs.length){
            if(this.govprojs[this.x]=="listahan"){
              this.listahanchecked=false
              break;
            } else{
              this.listahanchecked=true
            }
            this.x++
          }
          if(this.listahanchecked==true){
            this.fifthFormGroup.controls.household.setValue('')
          }
        break;
  }
 }

getErrorMessage(){
  return 'This field is required'
}

getErrorEmail(email){
    return this.firstFormGroup.controls.email.hasError('required') ? 'This field is required' :
    this.firstFormGroup.controls.email.hasError('email') ? 'Not a valid email' :'';
}

setreason(){
  if(this.secondFormGroup.value.reason == 'Other'){
    this.reasonisother=false
    
  }else{
    this.reasonisother=true
    this.secondFormGroup.controls.reasonother.setValue('')
  }
}

setDisabled(){
  if(this.fifthFormGroup.value.disabled == 'Yes'){
    this.isdisabled=false
    this.fifthFormGroup.controls.disability.setValue('')
    
  }else{
    this.isdisabled=true
    this.fifthFormGroup.controls.disability.setValue('NONE')
  }
}

setscholar(){
  if(this.secondFormGroup.value.scholar == '1'){
    this.notScholar=false
    
  }else{
    this.notScholar=true
    this.secondFormGroup.controls.scholartype.setValue('NONE')
  }
}

settransferee(){
  if(this.secondFormGroup.value.transferee == '1'){
    this.notTransferee=false
    
  }else{
    this.notTransferee=true
    this.secondFormGroup.controls.transfercourselevel.setValue('NONE')
  }
}


setreasonstudy(){
  if(this.secondFormGroup.value.reasonstudy == 'Other'){
    this.reasonstudyisother=false
    
  }else{
    this.reasonstudyisother=true
    this.secondFormGroup.controls.reasonstudyother.setValue('')
  }
}

next(){
  this.showErrors1=true;
  }

next2(){
  this.showErrors2=true;
  }  

submit(){
  this.showErrors3=true;
  this.student.idnumber = this.firstFormGroup.value.idnumber
  this.student.year = this.secondFormGroup.value.yrlevel
  this.student.sem = this.secondFormGroup.value.sem
  this.student.regular = this.secondFormGroup.value.regular
  this.student.schoolyear = this.acadyear
  this.student.mobile = this.secondFormGroup.value.mobile1
  this.student.email = this.secondFormGroup.value.email1
  this.ds.sendRequest('reenlist', this.student).subscribe((res)=>{
    if(res[0]=='success'){
      Swal.fire({
        icon: res[0],
        title: 'Thank You!',
        text: 'Please check our website/facebook for enrollment and schedule information.'
      }).then(() => {
        this.router.navigate(['enlistment']);
      });
    } else{
      Swal.fire({
        icon: 'error',
        title: res,
        text: 'Please check our website/facebook for enrollment and schedule information.'
      }).then(() => {
        this.router.navigate(['enlistment']);
      });
    }
  });
  
}



}