import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../app/models/user';

@Component({
  selector: 'app-project',
  templateUrl: './teamsetup.component.html',
  styleUrls: ['./teamsetup.component.scss'],
  encapsulation:  ViewEncapsulation.None
})
export class TeamSetupComponent implements OnInit {
  accountsSetup = false;
  noAccountsSetup = !this.accountsSetup;
  editingUser = false;
  editedUser: User;
  users: User[];

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this._getUsers();
  }

  private _getUsers() {
    this.userService.getUsers()
      .subscribe(
        users => {
          this.users = users;
        },
        error => {
          console.log(error);
        });
  }

  get hasApiKey(): boolean {
    return !!this.editedUser.apiKey;
  }

  get hasNoApiKey(): boolean {
    return !this.hasApiKey;
  }

  public createAccounts() {
    this.accountsSetup = true;
    this.noAccountsSetup = false;
  }

  public editUser(user: User) {
    this.editingUser = true;
    this.editedUser = user;
  }

  public addUser() {
    this.editUser(new User());
  }

  public removeUser() {
    this.editingUser = false;
    this._removeUser();
    this.editedUser = undefined;
  }

  public generateKey() {
    this.userService.create(this.editedUser)
      .subscribe(
        (apiKey) => {
          console.log('Success!'); /* TODO: need to toast */
          this.editedUser.apiKey = apiKey;
          this._getUsers();
        },
        error => {
          console.log(`Failure!  ${error}`);
          /* TODO: need to toast */
        }
      );
  }

  private _removeUser() {
    this.userService.removeUser(this.editedUser)
      .subscribe(
        result => {
          this._getUsers();
          console.log('Success!'); /* TODO: need to toast */
        },
        error => {
          console.log(`Failure!  ${error}`);
          /* TODO: need to toast */
        }
      );
  }
}
