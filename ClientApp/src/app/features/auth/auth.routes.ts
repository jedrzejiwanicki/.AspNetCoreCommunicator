import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthPageComponent } from './auth-page/auth-page.component';

export const routes: Routes = [
	{
		path: '',
		component: AuthPageComponent,
		children: [
			{
				path: 'login',
				component: LoginComponent,
			},
			{
				path: 'register',
				component: RegisterComponent,
			},
			{
				path: '**',
				redirectTo: 'login',
			},
		],
	},

];
