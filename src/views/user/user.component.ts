import {Component, ViewEncapsulation} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {User} from '../../app/models/user';
import {UserService} from '../../services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent {
  private _user: User = new User();
  public isNew = true;
  public notNew = !this.isNew;

  constructor(private userService: UserService) {
  }

  get user(): User {
    return this._user
  }

  set user(user: User) {
    this.isNew = false;
    this._user = user;
  }

  create() {
    this.userService.create(this.user)
      .subscribe(
        result => {
          console.log('Success!'); /* TODO: need to toast */
        },
        error => {
          console.log(`Failure!  ${error}`); /* TODO: need to toast */
        }
      );
  }

  save() {
    this.userService.save(this.user)
      .subscribe(
        result => {
          console.log('Success!'); /* TODO: need to toast */
        },
        error => {
          console.log(`Failure!  ${error}`); /* TODO: need to toast */
        }
      );
  }

}
