import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ExistingRoomGuard } from '@guards/existing-room.guard';

import { routes } from './room-page.routes';
import { RoomPageComponent } from './components/room-page/room-page.component';
import { RoomNotFoundPageComponent } from './components/room-not-found-page/room-not-found-page.component';
import { BrowserRoomPageComponent } from './components/browser-room-page/browser-room-page.component';
import { HomeComponent } from './components/home/home.component';
import { RoomLeaveGuard } from '@features/room-page/guards/room-leave.guard';
import { VideoThumbnailComponent } from './components/video-thumbnail/video-thumbnail.component';
import { UserVideoThumbnailComponent } from './components/user-video-thumbnail/user-video-thumbnail.component';
import { RoomParticipantComponent } from './components/room-participant/room-participant.component';

@NgModule({
	declarations: [
		RoomPageComponent,
		RoomNotFoundPageComponent,
		BrowserRoomPageComponent,
		HomeComponent,
		VideoThumbnailComponent,
		UserVideoThumbnailComponent,
		RoomParticipantComponent,
	],
	providers: [ExistingRoomGuard, RoomLeaveGuard],
	imports: [ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
})
export class RoomPageModule {}
