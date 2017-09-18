import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../app/models/user";

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
    this.userService.getUsers()
      .subscribe(
        users => {
          this.users = users;
        },
        error => {
          console.log(error);
        });
  }

  public createAccounts() {
    this.accountsSetup = true;
    this.noAccountsSetup = false;
  }

  public editUser(user: User) {
    this.editingUser = true;
    this.editedUser = user;
  }
}
