import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as jQuery from 'jquery';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {Router} from '@angular/router';
import {Task} from '../../models/task';
import {TaskService} from '../../services';
import {User} from '../../app/models/user';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  allTasks: Task[];
  tasks: Task[];
  users: User[];
  errorMessage: string;

  pageNumber: number;
  project: string;

  constructor(private taskService: TaskService,
              private userService: UserService,
              public router: Router) {
    this.pageNumber = 1;
  }

  ngOnInit() {
    this.getTasks('');
    this.getUsers();
  }

  showAllFlows() {
    this.removeSelectedUserClasses();
    const spanForAllFlows = jQuery('span:contains(\'All flows\')');  // Hack - use an I18N string instead
    spanForAllFlows.addClass('selectedUser');
    this.tasks = this.allTasks;
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        users => this.setUsers(users),
        error => {
          console.log(error);
         });
  }

  getTasks(project) {
    this.project = project;
    this.taskService.getTasks(project)
      .subscribe(
        tasks => {
          this.allTasks = tasks;
          this.tasks = tasks;
        },
        error => {
          this.errorMessage = <any>error
        });
  }

  goToUserIfms(user) {
    this.selectUser(user);
    this.taskService.getTasksForUser(user)
      .subscribe(
        tasks => this.setTasks(tasks),
        error => this.errorMessage = <any>error
      );
  };

  goToTask(task) {
    if (task.hasOwnProperty('id')) {
      this.router.navigate([`/task/${task.id}`]);
    }
  }

  getMore() {
    console.log('getMore()');
    // this.taskService.getMoreTasks(this.project, this.pageNumber)
    //   .subscribe(
    //     tasks => this.setTasks(tasks),
    //     error =>  this.errorMessage = <any>error);
  }

  private selectUser(user) {
    this.removeSelectedUserClasses();
    const spanForUser = jQuery(`span:contains(${user.name})`).filter(function() {return jQuery(this).text() === `${user.name}`; });
    spanForUser.addClass('selectedUser');
  }

  private removeSelectedUserClasses() {
    const selectedUsers = jQuery(`span[class='selectedUser']`)
      .removeClass('selectedUser');
  }

  private setUsers(response) {
    this.users = <User[]>response; // .filter(user => (user.name !== null) && (user.email !== null));
  }

  private setTasks(response) {
    this.tasks = response;
  }

  private sortTasks(list, property) {
    list.sort(function (a, b) {
      let nameA = a[property];
      let nameB = b[property];
      nameA = (typeof nameA === 'string') ? nameA.toUpperCase() : nameA;
      nameB = (typeof nameB === 'string') ? nameB.toUpperCase() : nameB;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    return list;
  }
}
