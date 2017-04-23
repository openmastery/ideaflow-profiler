import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {MomentModule} from 'angular2-moment/moment.module';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {Subject} from 'rxjs/Subject';
import {Task} from '../../models/task';
import {TaskFullDetail} from '../../models/taskFullDetail';
import {TaskService} from '../../services'
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Timeline} from "../../models/taskDetail/timeline";
import {SubTask} from "../../models/taskDetail/subTask";
import {NavLink} from "../../models/navLink";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent implements OnInit {
  private id: string;
  private taskDetail: TaskFullDetail;
  private task: Task;
  private errorMessage: string;

  public panelLinks: any = ['haystack', 'pain', 'metrics'];
  private activePanel: any = 'haystack';

  private activeSubtask: SubTask;
  private activeTimeline: Timeline;
  private activeCursor: any;
  private timelineBreakdown: string = 'metrics';



  // <!--//nav here, that sets a ng model object with a flag based on the active selection-->
  //   <!--//the activeFullPath will be the zoom in coordinate, active on all views-->
  //     <!--//toggling across the different views will show group: [Haystacks], [Pain], [Metrics]-->
  //       <!--//if only one, zoom in automatically to the subtask.-->

  constructor(private taskService: TaskService, private route: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {
    let sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.initTaskDetails(this.id);

  }

  initTaskDetails(taskId) {
    this.taskService.getTaskFullDetail(taskId)
      .subscribe(
        taskDetail => this.setTaskFullDetail(taskDetail),
        error => this.errorMessage = <any>error
      );
  }

  setTaskFullDetail(taskDetail) {
    this.taskDetail = taskDetail;
    this.activeTimeline = taskDetail.timeline;
  }

  goToTopLevelTask() {
    this.activeTimeline = this.taskDetail.timeline;
    this.activeSubtask = null;
  }

  goToSubtask(index, subtask) {
    this.activeTimeline = this.taskDetail.subtaskTimelines[index];
    this.activeSubtask = subtask;
  }

  goToGlossary(hashTag) {
    if (hashTag) {
      let hashTagWithoutPound = hashTag.substring(1, hashTag.length);
      this.router.navigate(['/glossary/task/' + this.id + '/tag/' + hashTagWithoutPound]);
    }
  }

  goToPanel(panelName) {
    this.activePanel = panelName;
    console.log('Nav to panel:' + panelName);
  }

  switchBreakdownType(event) {
    console.log("Switch!"+event)
  }

  handleCursorUpdated(currentPosition) {

    if (currentPosition.relativeTime != null) {
      this.activeCursor = currentPosition;
    } else {
      this.activeCursor = null;
    }

  }

  handleActiveSubtaskUpdated(selectedSubtask) {
    console.log("Selection changed!" + selectedSubtask.index);
    this.activeSubtask = selectedSubtask.subtask;
    this.activeTimeline = this.taskDetail.subtaskTimelines[selectedSubtask.index];
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
