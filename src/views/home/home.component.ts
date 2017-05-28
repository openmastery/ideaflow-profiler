import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MomentModule } from 'angular2-moment/moment.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Task } from '../../models/task';
import { TaskService, SearchService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation:  ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  tasks: Task[];
  errorMessage: string;

  pageNumber: number;
  project: string;

  private searchResults: Task[];
  private query = '';
  private lastQuery = '';
  private searchError: string;

  constructor(private taskService: TaskService, private searchService: SearchService,
              public router: Router) {
    this.pageNumber = 1;
  }

  ngOnInit() {
    this.getTasks("");
  }

  getTasks(project) {
    this.project = project;
    this.taskService.getTasks(project)
    .subscribe(
      tasks => this.setTasks(tasks),
      error =>  this.errorMessage = <any>error);
  }

  goToTask(task){
    if(task.hasOwnProperty('id')){
      this.router.navigate(['/task/'+task.id]);
    }
  }

//   this.results = this.results.concat(data.results);
//   this._next = data.next;
// },

  getMore(){
    console.log("getMore()");
    // this.taskService.getMoreTasks(this.project, this.pageNumber)
    //   .subscribe(
    //     tasks => this.setTasks(tasks),
    //     error =>  this.errorMessage = <any>error);
  }

  private setTasks(response){
    this.tasks = response;
    //this.tasks = this.sortTasks(response,"id");
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

  private search(query: string) {
    this.lastQuery = String(query);
    this.searchError = null;

    if (query.trim().length === 0) {
      this.searchResults = null;
      return;
    }

    this.searchService.searchTasks(query.split(' '))
      .subscribe(
        tasks => this.searchResults = tasks,
        error => {
          this.searchError = error;
          this.searchResults = null;
        },
      );
  }

  private showAllIfEmpty(query) {
    if (query.trim().length === 0) {
      this.searchError = null;
      this.searchResults = null;
    }
  }
}
