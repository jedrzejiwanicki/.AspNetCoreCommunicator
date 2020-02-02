import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserRoomPageComponent } from './browser-room-page.component';

describe('BrowserRoomPageComponent', () => {
  let component: BrowserRoomPageComponent;
  let fixture: ComponentFixture<BrowserRoomPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserRoomPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserRoomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
