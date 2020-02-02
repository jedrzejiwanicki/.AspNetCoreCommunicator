import { Injectable } from '@angular/core';
import * as SignalR from '@aspnet/signalr';
import { HttpTransportType } from '@aspnet/signalr';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { SignalingEvent } from '../../enums/signaling-event';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectAuthToken, selectAuthTokenAsPromise } from '@store/selectors/auth.selectors';

@Injectable({
	providedIn: 'root',
})
export class SignalRManager {
	private connection: SignalR.HubConnection;
	private connectionId: string;
	private $connectionStartedStream: BehaviorSubject<SignalR.HubConnection> = new BehaviorSubject(
		null
	);
	constructor(private store: Store<AppState>) {}

	public init(): void {
		this.createConnection();

		selectAuthToken(this.store)
			.pipe(first())
			.toPromise()
			.then((token) => console.log(token));
	}

	public onConnectionStarted(): Observable<SignalR.HubConnection> {
		return this.$connectionStartedStream.pipe(filter((value) => !!value));
	}

	public getConnectionId(): string {
		return this.connectionId;
	}

	private createConnection(): void {
		this.connection = new SignalR.HubConnectionBuilder()
			.withUrl(`${environment.API_URL}/signaling`, {
				accessTokenFactory: () => selectAuthTokenAsPromise(this.store),
				transport: HttpTransportType.WebSockets,
			})
			.build();

		this.connection
			.start()
			.then(() => this.connection.invoke(SignalingEvent.GetConnectionId))
			.then((connectionId: string) => {
				this.connectionId = connectionId;
				this.$connectionStartedStream.next(this.connection);
			})
			.catch((e) => console.log('Connection failed!', e));
	}
}
