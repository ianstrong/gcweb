import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgsoldComponent } from './igsold.component';

describe('IgsoldComponent', () => {
  let component: IgsoldComponent;
  let fixture: ComponentFixture<IgsoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgsoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgsoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
