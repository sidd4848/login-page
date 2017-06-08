import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { UserService } from '../_services/index';
import { AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
	styleUrls: [ './home.component.css' ]
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService, private authenticationService: AuthenticationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		console.log(this.currentUser);
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(username: string) {
        this.userService.delete(username).subscribe(() => { this.loadAllUsers() });
    }
    logout(){
		this.authenticationService.logout();
	}
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
