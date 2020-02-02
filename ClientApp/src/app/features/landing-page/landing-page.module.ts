import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { routes } from './landing-page.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [LandingPageComponent, HomeComponent],
	imports: [CommonModule, RouterModule.forChild(routes), NgbModule, ReactiveFormsModule],
})
export class LandingPageModule {}
