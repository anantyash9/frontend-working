import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAttendenceViewComponent } from './user-attendence-view.component';

describe('UserAttendenceViewComponent', () => {
  let component: UserAttendenceViewComponent;
  let fixture: ComponentFixture<UserAttendenceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAttendenceViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAttendenceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
