import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private config: AppConfig) { }

    login(username: string, password: string) {
    console.log(username + " autherizing");
        return this.http.post(this.config.apiUrl + '/users/authenticate', { username: username, password: password })
            .map((response: Response) => {
				console.log(response._body);
				let user = response._body;
				 localStorage.setItem('currentUser', JSON.stringify(user));
              }
            );
}

		logout() {
        localStorage.removeItem('currentUser');
		window.location.reload();
    }
}
