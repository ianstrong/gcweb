import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyFooterComponent } from './faculty-footer.component';

describe('FacultyFooterComponent', () => {
  let component: FacultyFooterComponent;
  let fixture: ComponentFixture<FacultyFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
