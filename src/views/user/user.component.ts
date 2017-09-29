import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {User} from '../../app/models/user';
import {UserService} from '../../services';
import {ActivatedRoute} from '@angular/router';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
  @Input() user: User;
  private id: string;
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

  get notNew(): boolean {
    return this.user === undefined || this.user === null;
  }

  get isNew(): boolean {
    return !this.user;
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
    this.userService.save(this.user)
      .subscribe(
        result => {
          console.log('Save success!'); /* TODO: need to toast */
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
