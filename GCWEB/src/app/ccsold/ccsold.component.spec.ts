import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcsoldComponent } from './ccsold.component';

describe('CcsoldComponent', () => {
  let component: CcsoldComponent;
  let fixture: ComponentFixture<CcsoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcsoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcsoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
