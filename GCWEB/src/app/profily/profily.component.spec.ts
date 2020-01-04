import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilyComponent } from './profily.component';

describe('ProfilyComponent', () => {
  let component: ProfilyComponent;
  let fixture: ComponentFixture<ProfilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
