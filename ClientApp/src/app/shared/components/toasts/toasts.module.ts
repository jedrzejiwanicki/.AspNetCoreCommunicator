import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsComponent } from '@shared/components/toasts/toasts.component';

@NgModule({
	imports: [NgbToastModule, CommonModule],
	declarations: [ToastsComponent],
	exports: [
		ToastsComponent,
	],
})
export class ToastsModule {}
