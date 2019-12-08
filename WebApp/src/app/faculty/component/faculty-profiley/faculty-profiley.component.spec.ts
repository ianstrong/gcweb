import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyProfileyComponent } from './faculty-profiley.component';

describe('FacultyProfileyComponent', () => {
  let component: FacultyProfileyComponent;
  let fixture: ComponentFixture<FacultyProfileyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyProfileyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyProfileyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
