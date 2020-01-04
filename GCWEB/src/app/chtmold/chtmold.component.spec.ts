import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChtmoldComponent } from './chtmold.component';

describe('ChtmoldComponent', () => {
  let component: ChtmoldComponent;
  let fixture: ComponentFixture<ChtmoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChtmoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChtmoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
