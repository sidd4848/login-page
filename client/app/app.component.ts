import { Component } from '@angular/core';
import { User } from './_models/user';
import { UserService } from './_services/index';
import { AuthenticationService } from './_services/index';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html',
	styleUrls: [ './app.component.css' ]
})

export class AppComponent {
currentUser: User;

    constructor(private userService: UserService,private authenticationService: AuthenticationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		console.log(this.currentUser);
    }
    checklog(){
        if(localStorage.getItem('currentUser'))
         return true;
         else
          return false;
    }
    logout(){
    	this.authenticationService.logout();
    }
    }
