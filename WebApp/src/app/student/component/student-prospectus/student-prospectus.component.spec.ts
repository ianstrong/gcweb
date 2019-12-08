import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProspectusComponent } from './student-prospectus.component';

describe('StudentProspectusComponent', () => {
  let component: StudentProspectusComponent;
  let fixture: ComponentFixture<StudentProspectusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProspectusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProspectusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
