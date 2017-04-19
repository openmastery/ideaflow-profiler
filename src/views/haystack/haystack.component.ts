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
  @Input() private haystacks: Array<Haystack>;
  @Input() private timelineBreakdown: string;

  @Output() activeSubtaskUpdated = new EventEmitter();
  @Output() cursorUpdated = new EventEmitter();



  private sortKeys: any = { 'haystack-relativePositionInSeconds': true };
  private subtaskHaystackLists: Array<Array<Haystack>> = [];

  private flatHistory: Array<any> = [];

  constructor(private taskService: TaskService, private route: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {
    console.log('haystack init!');
  }

  ngOnChanges() {
    console.log('haystack change!');
    if (this.subtasks && this.haystacks) {

      if (this.timelineBreakdown == 'haystacks') {
        console.log('haystacks!');
        this.initializeByHaystack();
      } else if (this.timelineBreakdown == 'wtfs') {
        console.log('wtfs!');
        this.initializeByWTF();
      }

    }
  }

  initializeByHaystack() {
    for (let subtask of this.subtasks) {
      let start = subtask.relativePositionInSeconds;
      let end = subtask.relativePositionInSeconds + subtask.durationInSeconds;

      let flatHistory = this.findHaystacksWithinRange(start, end);
      subtask.flatHistory = flatHistory;
      //faciliate sort by keeping track of child lists to sort
      this.subtaskHaystackLists.push(flatHistory)
    }
  }

  initializeByWTF() {
    for (let subtask of this.subtasks) {
      let start = subtask.relativePositionInSeconds;
      let end = subtask.relativePositionInSeconds + subtask.durationInSeconds;

      let flatHistory = [];
      for (let journey of subtask.troubleshootingJourneys) {
        for (let painCycle of journey.painCycles) {

          flatHistory.push(painCycle);
        }
      }

      for (let progressTick of subtask.progressTicks) {
        flatHistory.push(progressTick);
      }
      subtask.flatHistory = flatHistory;
      this.sortByProperty(flatHistory, 'relativePositionInSeconds', subtask.relativePath);

      //faciliate sort by keeping track of child lists to sort
      this.subtaskHaystackLists.push(flatHistory)
    }
  }

  updateCursorPosition(relativePosition, relativePath) {
    let currentPosition = { relativeTime: relativePosition, relativePath: relativePath };
    this.cursorUpdated.emit(currentPosition);
  }

  findHaystacksWithinRange(relativeStart, relativeEnd) {
    let matchingHaystacks = [];

    for (let haystack of this.haystacks) {
      if (this.isHaystackWithinRange(haystack, relativeStart, relativeEnd)) {
        matchingHaystacks.push(haystack);
      }
    }
    return matchingHaystacks;
  }

  isHaystackWithinRange(haystack, relativeStart, relativeEnd) {
    let haystackStart = haystack.relativePositionInSeconds;
    let haystackEnd = haystack.relativePositionInSeconds + haystack.durationInSeconds;
    return (haystackStart >= relativeStart && haystackStart < relativeEnd);

  }

  sortAllHaystacksByProperty(property, sortkeyPrefix) {
    this.subtaskHaystackLists.forEach((haystacks, index) => {
      this.sortByProperty(haystacks, property, sortkeyPrefix + index);
    });


  }

  sortByProperty(list,property, sortkeyPrefix){

    list.sort(function(a, b) {
      var sortValue;
      var nameA = a[property];
      var nameB = b[property];
      nameA = (typeof nameA === 'string') ? nameA.toUpperCase() : nameA;
      nameB = (typeof nameB === 'string') ? nameB.toUpperCase() : nameB;
      if (nameA < nameB) {
        sortValue = -1;
      }
      if (nameA > nameB) {
        sortValue = 1;
      }
      if (nameA == nameB) {
        sortValue = 0;
      }
      return sortValue;
    });

    let sortkey = sortkeyPrefix + '-' + property;

    if (this.sortKeys[sortkey]) {
      list.reverse();
      this.sortKeys[sortkey] = false;
    } else {
      this.sortKeys[sortkey] = true;
    }

    console.log(this.sortKeys);
    return list;
  }

  // collapseAllHaystacks() {
  //   for (let haystack of this.allHaystacks) {
  //     haystack.isExpanded = false;
  //   }
  // }

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

  activateTimeline(index, subtask) {
    let selectedSubtask = { index: index, subtask: subtask };
    this.activeSubtaskUpdated.emit(selectedSubtask);

    console.log('activated!');
  }

  toggleExpanded(toggleable, children) {
    //if (children.length > 0) {
      if (toggleable.isExpanded == true) {
        toggleable.isExpanded = false;
      } else {
        toggleable.isExpanded = true;
      }
    //}
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
    let s = Math.floor(d % 3600) - (m * 60);

    if (d == 0) {
      return "";
    }

    return ( (h > 0 ? h + "h " : "") +
    (m > 0 ? ((m < 10 ? "0" : "") + m + "m ") : "") + (s < 10 ? "0" : "") + s + "s");
  }

  // createHaystack(processName, relativePosition) {
  //
  //   let haystack = <Haystack> {
  //     "position": null,
  //     "relativePath": "/haystack/5",
  //     "relativePositionInSeconds": relativePosition,
  //     "durationInSeconds": 140,
  //     "executionDurationInSeconds": 2,
  //     "processName": processName,
  //     "executionTaskType": "JUnit",
  //     "failed": false,
  //     "debug": false,
  //   };
  //
  //   haystack.activitySummaries = [
  //     <ActivitySummary> {
  //       "activityType": "editor",
  //       "activityName": "FileName.java",
  //       "activityDetail": "/this/path/to/FileName.java",
  //       "durationModifiedInSeconds" : 0,
  //       "durationInSeconds": 22
  //     },
  //     <ActivitySummary> {
  //       "activityType": "editor",
  //       "activityName": "IdeaFlowFile.java",
  //       "activityDetail": "/this/path/to/another/IdeaFlowFile.java",
  //       "durationModifiedInSeconds" : 22,
  //       "durationInSeconds": 34
  //     }
  //   ];
  //
  //   return haystack;
  // }


}
