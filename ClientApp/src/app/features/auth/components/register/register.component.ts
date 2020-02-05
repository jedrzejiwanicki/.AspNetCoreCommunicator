import { Component, OnInit } from '@angular/core';
import { SignUpAction } from '@store/actions/auth';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'cm-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	form: FormGroup = new FormGroup({
		login: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
	});

	constructor(private store: Store<AppState>) {}

	ngOnInit() {}

	onSubmit(): void {
		this.store.dispatch(
			new SignUpAction({
				name: this.form.get('login').value,
				password: this.form.get('password').value,
			})
		);
	}
}
