import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultySchedComponent } from './faculty-sched.component';

describe('FacultySchedComponent', () => {
  let component: FacultySchedComponent;
  let fixture: ComponentFixture<FacultySchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultySchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultySchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
