import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Task } from '../../models/task';
import { TaskService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './teamsetup.component.html',
  styleUrls: ['./teamsetup.component.scss'],
  encapsulation:  ViewEncapsulation.None
})
export class TeamSetupComponent implements OnInit {
  id: string;
  private sub: any;

  tasks: Task[];
  errorMessage: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, public router: Router) {

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

  goToTask(task) {
    if (task.hasOwnProperty('id')) {
      this.router.navigate(['/task/' + task.id]);
    }
  }

  private setTasks(response) {
    this.tasks = response;
  }

  private sortTasks(list, property) {
    list.sort(function(a, b) {
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
