import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Room } from '@models/index';
import { AppState } from '@store/reducers';
import { FetchAllRoomsAction } from '@store/actions/rooms';

@Component({
	selector: 'cm-browser-room-page',
	templateUrl: './browser-room-page.component.html',
	styleUrls: ['./browser-room-page.component.scss'],
})
export class BrowserRoomPageComponent implements OnInit {
	public rooms: Observable<Room[]>;
	public form: FormGroup = new FormGroup({
		room: new FormControl('', [Validators.required]),
	});

	constructor(private router: Router, private store: Store<AppState>) {}

	ngOnInit() {
		this.store.dispatch(new FetchAllRoomsAction());

		this.rooms = this.store.select((state) => state.rooms.rooms);
	}

	onSubmit(): void {
		this.router.navigateByUrl(`/rooms/room/${this.form.get('room').value}`);
	}
}
