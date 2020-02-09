import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
@Component({
	selector: 'cm-root',
	templateUrl: './app.component.html',
})
export class AppComponent {
	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas);
	}
}
