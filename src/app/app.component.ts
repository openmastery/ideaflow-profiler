import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public showNavlinks = false;
  public navLinks = [
    'IdeaFlow',
    'Glossary',
    'Team'
  ];

  constructor(private userService: UserService) {
    // Probably should use an Angular 2 Resolver instead of this constructor logic, but that whole mechanism seems too weighty
    userService.getUsers()
      .subscribe(
        users => {
          users.length = 0;
          this.showNavlinks = users.length > 0;
        },
        error => {
          console.log(error);
        });
  }
}
