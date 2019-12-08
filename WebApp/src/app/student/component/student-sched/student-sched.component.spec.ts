import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSchedComponent } from './student-sched.component';

describe('StudentSchedComponent', () => {
  let component: StudentSchedComponent;
  let fixture: ComponentFixture<StudentSchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
