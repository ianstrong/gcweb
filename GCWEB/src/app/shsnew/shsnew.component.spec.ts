import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShsnewComponent } from './shsnew.component';

describe('ShsnewComponent', () => {
  let component: ShsnewComponent;
  let fixture: ComponentFixture<ShsnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShsnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShsnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
