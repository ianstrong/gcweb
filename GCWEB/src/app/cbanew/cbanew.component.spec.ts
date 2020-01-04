import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbanewComponent } from './cbanew.component';

describe('CbanewComponent', () => {
  let component: CbanewComponent;
  let fixture: ComponentFixture<CbanewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbanewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbanewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
