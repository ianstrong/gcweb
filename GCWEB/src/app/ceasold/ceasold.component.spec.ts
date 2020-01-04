import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeasoldComponent } from './ceasold.component';

describe('CeasoldComponent', () => {
  let component: CeasoldComponent;
  let fixture: ComponentFixture<CeasoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeasoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeasoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
