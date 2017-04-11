import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MomentModule } from 'angular2-moment/moment.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import { Task } from '../../models/task';
import { TaskFullDetail } from '../../models/taskFullDetail';
import { TaskService } from '../../services'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {Timeline} from "../../models/taskDetail/timeline";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  encapsulation:  ViewEncapsulation.None
})
export class TaskComponent implements OnInit {
  private id: string;
  private sub: any;
  private taskDetail: TaskFullDetail;
  private task : Task;
  private errorMessage: string;
  private taskName : string = 'US 23523423';
  private that : any = this;

  private timelineData: Timeline;

  constructor(private taskService: TaskService, private route: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.getTaskFullDetail(this.id);

  }

  goToGlossary(hashTag) {
    if(hashTag){
      let hashTagWithoutPound = hashTag.substring(1, hashTag.length);
      this.router.navigate(['/glossary/task/'+this.id+'/tag/'+hashTagWithoutPound]);
    }
  }

  getTaskFullDetail(taskId) {
    this.taskService.getTaskFullDetail(taskId)
    .subscribe(
      taskDetail => this.setTaskFullDetail(taskDetail),
      error =>  this.errorMessage = <any>error
    );
  }

  setTaskFullDetail(taskDetail){
    this.taskDetail = taskDetail;
    this.timelineData = taskDetail.timeline;
  }

  formatRelative(time) {
    let d = Number(time);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);

    return ( h + ":" + (m < 10 ? "0" : "") + m );
  }


  formatDuration(duration) {
    let d = Number(duration);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(m % 3600 / 60);

    return ( (h > 0 ? h + "h " : "") + (m < 10 ? "0" : "") + m + "m "); //+ (s < 10 ? "0" : "") + s + "s")
  }

}
