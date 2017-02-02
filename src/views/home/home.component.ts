import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MomentModule } from 'angular2-moment/moment.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import { Task } from '../../models/task';
import { TaskService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation:  ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  tasks: Task[];
  errorMessage: string;

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks()
    .subscribe(
      tasks => this.tasks = tasks,
      error =>  this.errorMessage = <any>error);
  }


}
