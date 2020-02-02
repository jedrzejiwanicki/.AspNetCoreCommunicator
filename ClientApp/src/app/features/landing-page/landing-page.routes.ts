import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: LandingPageComponent,
			},
			{
				path: '**',
				redirectTo: ''
			}
		]
	},
];
