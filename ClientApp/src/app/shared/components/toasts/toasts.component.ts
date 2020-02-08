import { Component } from '@angular/core';
import { ToastService } from '@services/toast.service';

@Component({
	selector: 'cm-toasts',
	styles: [
		`
			.toasts__container {
				position: fixed;
				top: 70px;
				right: 0;
				box-sizing: border-box;
				padding: 0 20px;
			}

			.toasts__item {
				min-width: 200px;
			}
		`,
	],
	template: `
		<figure class="toasts__container">
			<ngb-toast
				class="toasts__item"
				*ngFor="let toast of toastService.getAll() | async"
				[autohide]="true"
				[delay]="toast.timeout"
				[header]="toast.header"
				[ngClass]="{
					'bg-danger text-light': toast.type === 'danger',
					'bg-success text-light': toast.type === 'success'
				}"
				(hide)="toastService.remove(toast.id)"
			>
				{{ toast.text }}
			</ngb-toast>
		</figure>
	`,
})
export class ToastsComponent {
	constructor(public toastService: ToastService) {}
}
