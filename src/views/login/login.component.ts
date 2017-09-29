import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [],
  styleUrls: ['./login.scss'],
  encapsulation:  ViewEncapsulation.None
})

export class LoginComponent  {

  public view: any = {
      authenticated:  false,
      email:          '',
      password:       ''
  };

  constructor(private router: Router, private userService: UserService) {

  }

  login() {
    // Probably should use an Angular 2 Resolver instead of this constructor logic, but that whole mechanism seems too weighty
    this.userService.getUsers()
      .subscribe(
        users => {
          // Uncomment the next statement if you want to force routing to /TeamSetup
          // users.length = 0;
          if (users.length === 0) {
            this.router.navigateByUrl('/TeamSetup');
          } else {
            this.router.navigateByUrl('/IdeaFlow');
          }
        },
        error => {
          console.log(error);
        });
    return false;
  }

}
