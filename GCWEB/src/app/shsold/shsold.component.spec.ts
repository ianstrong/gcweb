import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShsoldComponent } from './shsold.component';

describe('ShsoldComponent', () => {
  let component: ShsoldComponent;
  let fixture: ComponentFixture<ShsoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShsoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShsoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
