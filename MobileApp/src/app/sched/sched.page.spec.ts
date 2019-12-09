import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchedPage } from './sched.page';

describe('SchedPage', () => {
  let component: SchedPage;
  let fixture: ComponentFixture<SchedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
