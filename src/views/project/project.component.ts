import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MomentModule } from 'angular2-moment/moment.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import { Task } from '../../models/task';
import { TaskService } from '../../services'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation:  ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {
  id: string;
  private sub: any;

  tasks: Task[];
  errorMessage: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.getTasks(this.id);
  }

  getTasks(project) {
    this.taskService.getTasks(project)
    .subscribe(
      tasks => this.setTasks(tasks),
      error =>  this.errorMessage = <any>error);
  }

  private setTasks(response){
    this.tasks = this.sortTasks(response,"id");
  }

  private sortTasks(list,property){
    list.sort(function(a, b) {
      var nameA = a[property];
      var nameB = b[property];
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
