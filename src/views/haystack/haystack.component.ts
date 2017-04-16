import {Component, OnInit, ViewEncapsulation, Input, ElementRef, EventEmitter} from '@angular/core';
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
import {TroubleShootingJourney} from "../../models/taskDetail/troubleshootingJourney";
import {ViewChild} from "@angular/core/src/metadata/di";
import {SubTask} from "../../models/taskDetail/subTask";
import {Output} from "@angular/core/src/metadata/directives";
import {Haystack} from "../../models/haystack/haystack";
import {ActivitySummary} from "../../models/haystack/activitySummary";

@Component({
  selector: 'app-haystack',
  templateUrl: './haystack.component.html',
  styleUrls: ['./haystack.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HaystackComponent implements OnInit {
  @ViewChild('haystacks') private chartContainer: ElementRef;
  @Input() private subtasks: Array<SubTask>;
  @Input() private id: string;
  @Input() private activeSubtask: SubTask;

  @Output() activeSubtaskUpdated = new EventEmitter();

  private allHaystacks: Array<Haystack>;

  private flatHistory: Array<any> = [];

  constructor(private taskService: TaskService, private route: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {
    console.log("haystacks!");

    let haystack1 = this.createHaystack(500);
    haystack1.debug = true;
    let haystack2 = this.createHaystack(550);
    haystack2.failed = true;
    let haystack3 = this.createHaystack(550);

    this.allHaystacks = [haystack1, haystack2, haystack3];

    for (let haystack of this.allHaystacks) {
      this.flatHistory.push(haystack);

      for (let activity of haystack.activitySummaries ) {
        console.log('activity!');
        this.flatHistory.push(activity);
      }
    }

  }

  goToSubtask(index, subtask) {
    this.activeSubtask = subtask;

    let selectedSubtask = {index: index, subtask: subtask};
    this.activeSubtaskUpdated.emit(selectedSubtask);
  }

  goToGlossary(hashTag) {
    if (hashTag) {
      let hashTagWithoutPound = hashTag.substring(1, hashTag.length);
      this.router.navigate(['/glossary/task/' + this.id + '/tag/' + hashTagWithoutPound]);
    }
  }

  toggleExpandedHaystack(haystack) {
    if (haystack.isExpanded == true) {
      haystack.isExpanded = false;
    } else {
      haystack.isExpanded = true;
    }
  }

  formatRelative(time) {
    let d = Number(time);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);

    return ( h + ":" + (m < 10 ? "0" : "") + m );
  }


  formatShortDuration(duration) {

    let d = Number(duration);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 ) - (m * 60) - (h * 60);

    if (d == 0) {
      return "";
    }

    return ( (h > 0 ? h + "h " : "") +
    (m > 0 ? ((m < 10 ? "0" : "") + m + "m ") : "") + (s < 10 ? "0" : "") + s + "s");
  }

  createHaystack(relativePosition) {

    let haystack = <Haystack> {
      "position": null,
      "relativePath": "/haystack/5",
      "relativePositionInSeconds": relativePosition,
      "durationInSeconds": 140,
      "executionDurationInSeconds": 2,
      "processName": "TestIdeaFlowBand",
      "executionTaskType": "JUnit",
      "failed": false,
      "debug": false,
    };

    haystack.activitySummaries = [
      <ActivitySummary> {
        "activityType": "editor",
        "activityName": "FileName.java",
        "activityDetail": "/this/path/to/FileName.java",
        "durationModifiedInSeconds" : 3,
        "durationInSeconds": 22
      },
      <ActivitySummary> {
        "activityType": "editor",
        "activityName": "IdeaFlowFile.java",
        "activityDetail": "/this/path/to/another/IdeaFlowFile.java",
        "durationModifiedInSeconds" : 22,
        "durationInSeconds": 34
      }
    ];

    return haystack;
  }


}
