import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbaoldComponent } from './cbaold.component';

describe('CbaoldComponent', () => {
  let component: CbaoldComponent;
  let fixture: ComponentFixture<CbaoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbaoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbaoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
