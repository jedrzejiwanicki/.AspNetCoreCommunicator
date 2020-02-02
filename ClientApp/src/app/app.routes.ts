import { Routes } from '@angular/router';
import { AuthenticatedGuard } from '@guards/authenticated.guard';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadChildren: () =>
			import('./features/landing-page/landing-page.module').then((m) => m.LandingPageModule),
	},
	{
		path: 'rooms',
		canActivate: [AuthenticatedGuard],
		loadChildren: () =>
			import('./features/room-page/room-page.module').then((m) => m.RoomPageModule),
	},
	{
		path: 'auth',
		loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
	},
	{
		path: '**',
		redirectTo: '',
	},
];
