import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubjectprospectusComponent } from './admin-subjectprospectus.component';

describe('AdminSubjectprospectusComponent', () => {
  let component: AdminSubjectprospectusComponent;
  let fixture: ComponentFixture<AdminSubjectprospectusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubjectprospectusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubjectprospectusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
