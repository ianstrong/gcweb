import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChtmnewComponent } from './chtmnew.component';

describe('ChtmnewComponent', () => {
  let component: ChtmnewComponent;
  let fixture: ComponentFixture<ChtmnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChtmnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChtmnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
