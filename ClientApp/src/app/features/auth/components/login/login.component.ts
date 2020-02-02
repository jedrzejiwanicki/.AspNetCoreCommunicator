import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { SignalRManager } from '@core/services';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { LoginAction } from '@store/actions/auth';
import { selectAuthUserLoggedInIfTrue } from '@store/selectors/auth.selectors';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
	selector: 'cm-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	form: FormGroup = new FormGroup({
		login: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
	});
	constructor(
		private authService: AuthService,
		private signalRManager: SignalRManager,
		private store: Store<AppState>,
		private router: Router
	) {}

	ngOnInit() {
		selectAuthUserLoggedInIfTrue(this.store)
			.pipe(first())
			.subscribe(() => {
				this.router.navigateByUrl('/rooms/browse');
			});
	}

	onSubmit(): void {
		this.store.dispatch(
			new LoginAction({
				userName: this.form.get('login').value,
				password: this.form.get('password').value,
				connectionId: this.signalRManager.getConnectionId(),
			})
		);
	}
}
