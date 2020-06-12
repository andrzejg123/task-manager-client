import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityInRequestComponent } from './activity-in-request.component';

describe('ActivityInRequestComponent', () => {
  let component: ActivityInRequestComponent;
  let fixture: ComponentFixture<ActivityInRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityInRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityInRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
