import { Routes } from '@angular/router';
import { RoomPageComponent } from './components/room-page/room-page.component';
import { ExistingRoomGuard } from '@guards/existing-room.guard';
import { RoomNotFoundPageComponent } from './components/room-not-found-page/room-not-found-page.component';
import { AuthenticatedGuard } from '@guards/authenticated.guard';
import { BrowserRoomPageComponent } from './components/browser-room-page/browser-room-page.component';
import { HomeComponent } from './components/home/home.component';
import { RoomLeaveGuard } from '@features/room-page/guards/room-leave.guard';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: 'room/:name',
				component: RoomPageComponent,
				canActivate: [ExistingRoomGuard],
				canDeactivate: [RoomLeaveGuard],
			},
			{
				path: 'browse',
				component: BrowserRoomPageComponent,
			},
			{
				path: 'not-found',
				component: RoomNotFoundPageComponent,
			},
			{
				path: '**',
				redirectTo: 'not-found',
			},
		],
	},
];
