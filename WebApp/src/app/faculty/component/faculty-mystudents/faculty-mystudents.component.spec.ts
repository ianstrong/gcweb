import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyMystudentsComponent } from './faculty-mystudents.component';

describe('FacultyMystudentsComponent', () => {
  let component: FacultyMystudentsComponent;
  let fixture: ComponentFixture<FacultyMystudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyMystudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyMystudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
