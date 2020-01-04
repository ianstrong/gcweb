import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CahsoldComponent } from './cahsold.component';

describe('CahsoldComponent', () => {
  let component: CahsoldComponent;
  let fixture: ComponentFixture<CahsoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CahsoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahsoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
