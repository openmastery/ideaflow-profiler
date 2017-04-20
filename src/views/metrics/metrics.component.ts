import {Component, OnInit, ViewEncapsulation, Input, ElementRef, EventEmitter} from '@angular/core';
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
import {TroubleShootingJourney} from "../../models/taskDetail/troubleshootingJourney";
import {ViewChild} from "@angular/core/src/metadata/di";
import {SubTask} from "../../models/taskDetail/subTask";
import {Output} from "@angular/core/src/metadata/directives";


@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
  encapsulation:  ViewEncapsulation.None
})
export class MetricsComponent implements OnInit {
  @ViewChild('metrics') private chartContainer: ElementRef;

  @Input() private taskDetail: TaskFullDetail;
  @Input() private subtasks: Array<SubTask>;
  @Input() private activeSubtask: SubTask;


  @Input() private taskId: string;

  @Output() activeSubtaskUpdated = new EventEmitter();


  constructor(private taskService: TaskService, private route: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {

  }


  goToSubtask(index, subtask) {
    let selectedSubtask = { index: index, subtask: subtask };
    this.activeSubtaskUpdated.emit(selectedSubtask);
  }

  goToGlossary(hashTag) {
    if(hashTag){
      let hashTagWithoutPound = hashTag.substring(1, hashTag.length);
      this.router.navigate(['/glossary/task/'+this.taskId+'/tag/'+hashTagWithoutPound]);
    }
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
