import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVideoThumbnailComponent } from './user-video-thumbnail.component';

describe('UserVideoThumbnailComponent', () => {
  let component: UserVideoThumbnailComponent;
  let fixture: ComponentFixture<UserVideoThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVideoThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVideoThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
