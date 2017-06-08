import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/users').map((response: Response) => response.json());
    }

    getById(_id: string) {
     return this.http.get(this.config.apiUrl + '/users/' + _id).map((response: Response) => response.json());
    }

    create(user: User) {
      return this.http.post(this.config.apiUrl + '/users/register', user);
    }

    update(user: User) {
      return this.http.put(this.config.apiUrl + '/users/' + user._id, user);
    }

    delete(username: string) {
		console.log(username);
        return this.http.delete(this.config.apiUrl + '/users/' + username);
    }

}
