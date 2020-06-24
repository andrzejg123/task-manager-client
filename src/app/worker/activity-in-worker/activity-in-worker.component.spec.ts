import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityInWorkerComponent } from './activity-in-worker.component';

describe('ActivityInWorkerComponent', () => {
  let component: ActivityInWorkerComponent;
  let fixture: ComponentFixture<ActivityInWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityInWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityInWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
