import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomMessagesComponent } from './room-messages.component';

describe('RoomMessagesComponent', () => {
  let component: RoomMessagesComponent;
  let fixture: ComponentFixture<RoomMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
