import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast extends ToastConfig {
	id: number;
}

export enum ToastType {
	Danger = 'danger',
	Success = 'success',
	Default = 'default',
}

export interface ToastConfig {
	timeout: number;
	text: string;
	header: string;
	type: ToastType;
}

export const DEFAULT_TOAST_CONFIG = {
	timeout: 2000,
	text: '',
	header: '',
	type: ToastType.Default,
};
@Injectable({
	providedIn: 'root',
})
export class ToastService {
	private toasts: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);

	constructor() {}

	getAll(): Observable<Toast[]> {
		return this.toasts;
	}

	add(config: ToastConfig): void {
		const id = this.toasts.value.length;

		this.toasts.next([...this.toasts.value, { ...DEFAULT_TOAST_CONFIG, ...config, id }]);
	}

	remove(id: number): void {
		this.toasts.next(this.toasts.value.filter((x) => x.id !== id));
	}
}
