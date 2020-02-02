import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainNavComponent } from '@shared/components/main-nav/main-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [CommonModule, NgbModule, RouterModule],
	declarations: [MainNavComponent],
	exports: [
		MainNavComponent,
	],
})
export class MainNavModule {}
