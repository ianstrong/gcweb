import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFacultymembersComponent } from './admin-facultymembers.component';

describe('AdminFacultymembersComponent', () => {
  let component: AdminFacultymembersComponent;
  let fixture: ComponentFixture<AdminFacultymembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFacultymembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFacultymembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
