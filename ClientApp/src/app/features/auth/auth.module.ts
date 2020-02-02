import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './auth.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [LoginComponent, RegisterComponent, AuthPageComponent],
	imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule.forChild(routes)],
})
export class AuthModule {}
