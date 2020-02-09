import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomParticipantsContinerComponent } from './room-participants-continer.component';

describe('RoomParticipantsContinerComponent', () => {
  let component: RoomParticipantsContinerComponent;
  let fixture: ComponentFixture<RoomParticipantsContinerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomParticipantsContinerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomParticipantsContinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
