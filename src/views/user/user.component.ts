import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {User} from '../../app/models/user';
import {UserService} from '../../services';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
  private id: string;
  private _user: User = new User();
  public isNew = true;
  public notNew = !this.isNew;
  public name = {
      errors: []
  };
  public email = {
    errors: []
  };

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.id = params['id'];
    });

   if (this.id) {
     this.load();
   }
  }

  get user(): User {
    return this._user;
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
          console.log(`Failure!  ${error}`);

          /* TODO: need to toast */
        }
      );
  }

  save() {
    debugger;
    this.userService.save(this.user)
      .subscribe(
        result => {
          console.log('Save success!'); /* TODO: need to toast */
          this.isNew = false;
        },
        error => {
          console.log(`Failure to save!  ${error}`); /* TODO: need to toast */
        }
      );
  }

  load() {
    this.userService.load(this.id)
      .subscribe(
        result => {
          console.log(result);
        },
        error => {
          console.log(`Failure to load!  ${error}`); /* TODO: need to toast */
        }
      );
  }

}
