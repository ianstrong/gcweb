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
  selector: 'app-cbanew',
  templateUrl: './cbanew.component.html',
  styleUrls: ['./cbanew.component.css']
})
export class CbanewComponent implements OnInit {
  student = new studentClass;
  isLinear = false;
  acadyear = ''
  sem = ''
  sup;
  department: any = {};
  departmentall: any = {};
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
    
    this.department.dept='CBA';
    this.departmentall.dept='';

    this.ds.sendRequest('getCourses',this.department).subscribe((courseres)=>{
      this.courses=courseres.data;
    });

    this.ds.sendRequest('getCourses',this.departmentall).subscribe((courseres)=>{
      this.coursesall=courseres.data;
      console.log(courseres.data)
    });

    this.firstFormGroup = this._formBuilder.group({
      lname: ['', Validators.required],
      fname: ['', Validators.required],
      mname: ['', Validators.required],
      nameext: [''],
      houseno1: [''],
      houseno: [''],
      street1: [''],
      city1: [''],
      province1: [''],
      zipcode1: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      zipcode: ['', Validators.required],
      gender: ['', Validators.required],
      civilstatus:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      dob: ['', Validators.required],
      age: ['', Validators.required],
      birthplace: ['', Validators.required]
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
    });
    this.thirdFormGroup = this._formBuilder.group({
      highschool: ['', Validators.required],
      strand: [''],
      lrn: [''],
      highschoolgpa: ['',  Validators.required],
      honors: [''],
      orgs: [''],
      competitions: [''],
      interest: [''],
      interestother: [''],
      talentother: [''],
      sportother: [''],
      talent: [''],
      sport: [''],
    });
    this.fourthFormGroup = this._formBuilder.group({
      siblings: ['', Validators.required],
      mother: ['', Validators.required],
      motheroccupation: ['', Validators.required],
      mothercontact: ['', Validators.required],
      father: ['', Validators.required],
      fatheroccupation: ['', Validators.required],
      fathercontact: ['', Validators.required],
      spouse: [''],
      spousecontact: [''],
      guardian: ['', Validators.required],
      relationship: ['', Validators.required],
      guardianadd: ['', Validators.required],
      emergencynumber: ['', Validators.required],
    });
    this.fifthFormGroup = this._formBuilder.group({
      govproj: [''],
      household: [''],
      govprojother: [''],
      disabled: ['', Validators.required],
      famincome: [''],
      disability: [''],
      tos: ['', Validators.required]
    });

    this.cleave6 = new Cleave(this.fifthFormGroup.controls.famincome,{
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      prefix: 'Php ',
      delimiter: ','
  });
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
  this.secondFormGroup.controls.sem.setValue(this.sem)
  this.secondFormGroup.controls.yrlevel.setValue('1')
  console.log(this.sem)
  }
next2(){
  this.showErrors2=true;
  }  

submit(){
  this.showErrors3=true;
  if(this.fifthFormGroup.controls.tos.invalid){
    alert('Please check the "Terms of Service" agreement button')
  }

  if(this.firstFormGroup.invalid==true||this.secondFormGroup.invalid==true||this.thirdFormGroup.invalid==true||this.fourthFormGroup.invalid==true||this.fifthFormGroup.invalid==true){
    alert("Please fill up all required fields before sumbitting!");
  } else{

  this.student.lname = this.firstFormGroup.value.lname;
  this.student.fname = this.firstFormGroup.value.fname;
  this.student.mname = this.firstFormGroup.value.mname;
  this.student.nameext = this.firstFormGroup.value.nameext;
  this.student.addressnum = this.firstFormGroup.value.houseno;
  this.student.addressst = this.firstFormGroup.value.street;
  this.student.addresscity = this.firstFormGroup.value.city;
  this.student.addressprovince = this.firstFormGroup.value.province;
  this.student.addresszip = this.firstFormGroup.value.zipcode;
  this.student.gender = this.firstFormGroup.value.gender;
  this.student.dob = this.firstFormGroup.value.dob;
  this.student.email = this.firstFormGroup.value.email;
  this.student.mobile = this.firstFormGroup.value.mobile;
  this.student.course = this.secondFormGroup.value.course
  this.student.course2 = this.secondFormGroup.value.course2;
  this.student.course3 = this.secondFormGroup.value.course3;
  this.student.reasoncourse = this.secondFormGroup.value.reason;
  this.student.courseother = this.secondFormGroup.value.reasonother;
  this.student.reasonschool = this.secondFormGroup.value.reasonstudy;
  this.student.schoolother = this.secondFormGroup.value.reasonstudyother;
  this.student.scholar = this.secondFormGroup.value.scholar;
  this.student.scholartype = this.secondFormGroup.value.scholartype;
  this.student.sponsor = this.secondFormGroup.value.sponsor;
  this.student.sponsoroccupation = this.secondFormGroup.value.sponsoroccupation;
  this.student.transferee = this.secondFormGroup.value.transferee;
  this.student.transfercourselevel = this.secondFormGroup.value.transfercourselevel;
  this.student.highschool = this.thirdFormGroup.value.highschool
  this.student.strand = this.thirdFormGroup.value.highschoolstrand
  this.student.lrn = this.thirdFormGroup.value.lrn
  this.student.highschoolgpa = this.thirdFormGroup.value.highschoolgpa
  this.student.honors = this.thirdFormGroup.value.honors
  this.student.orgs = this.thirdFormGroup.value.orgs
  this.student.competitions = this.thirdFormGroup.value.competitions
  this.student.interests = this.thirdFormGroup.value.interest
  this.student.interestother = this.thirdFormGroup.value.interestother
  this.student.talentsother = this.thirdFormGroup.value.talentother
  this.student.sportother = this.thirdFormGroup.value.sportother
  this.student.talents = this.thirdFormGroup.value.talent
  this.student.sport = this.thirdFormGroup.value.sport
  this.student.siblings = this.fourthFormGroup.value.siblings
  this.student.mother = this.fourthFormGroup.value.mother
  this.student.motheroccupation = this.fourthFormGroup.value.motheroccupation
  this.student.mothercontact = this.fourthFormGroup.value.mothercontact
  this.student.father = this.fourthFormGroup.value.father
  this.student.fatheroccupation = this.fourthFormGroup.value.fatheroccupation
  this.student.fathercontact = this.fourthFormGroup.value.fathercontact
  this.student.spouse = this.fourthFormGroup.value.spouse
  this.student.spousecontact = this.fourthFormGroup.value.spousecontact
  this.student.guardian = this.fourthFormGroup.value.guardian
  this.student.relationship = this.fourthFormGroup.value.relationship
  this.student.guardianadd = this.fourthFormGroup.value.guardianadd
  this.student.emergencynumber = this.fourthFormGroup.value.emergencynumber
  this.student.govproj = this.fifthFormGroup.value.govproj
  this.student.household = this.fifthFormGroup.value.household
  this.student.govprojother = this.fifthFormGroup.value.govprojother
  this.student.disabled = this.fifthFormGroup.value.disabled
  this.student.famincome = this.fifthFormGroup.value.famincome
  this.student.disability = this.fifthFormGroup.value.disability
  this.student.year = '1'
  this.student.department = 'CBA'
  this.student.sem = this.sem
  this.student.yearenrolled = this.acadyear
  this.student.schoolyear = this.acadyear
  this.student.regular = this.secondFormGroup.value.regular
  console.log(this.student.sem)
  this.ds.sendRequest('insertNewStudent', this.student).subscribe((res)=>{
    console.log(res)
    Swal.fire({
      icon: res[0],
      title: res[1],
      text: 'Please write down your temporary registration number.'
    }).then(() => {
      this.router.navigate(['enlistment']);
    });
  });
}
}
}
