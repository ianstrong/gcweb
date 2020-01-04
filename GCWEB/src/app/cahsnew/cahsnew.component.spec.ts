import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CahsnewComponent } from './cahsnew.component';

describe('CahsnewComponent', () => {
  let component: CahsnewComponent;
  let fixture: ComponentFixture<CahsnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CahsnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahsnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
