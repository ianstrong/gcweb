import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeasnewComponent } from './ceasnew.component';

describe('CeasnewComponent', () => {
  let component: CeasnewComponent;
  let fixture: ComponentFixture<CeasnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeasnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeasnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
