import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmgComponent } from './vmg.component';

describe('VmgComponent', () => {
  let component: VmgComponent;
  let fixture: ComponentFixture<VmgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
