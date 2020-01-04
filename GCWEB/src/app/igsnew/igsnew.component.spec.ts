import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgsnewComponent } from './igsnew.component';

describe('IgsnewComponent', () => {
  let component: IgsnewComponent;
  let fixture: ComponentFixture<IgsnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgsnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgsnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
