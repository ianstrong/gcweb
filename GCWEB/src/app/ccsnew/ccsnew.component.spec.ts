import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcsnewComponent } from './ccsnew.component';

describe('CcsnewComponent', () => {
  let component: CcsnewComponent;
  let fixture: ComponentFixture<CcsnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcsnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcsnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
