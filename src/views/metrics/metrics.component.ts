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


@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MetricsComponent implements OnInit {
  @ViewChild('metrics') private chartContainer: ElementRef;

  @Input() private taskDetail: TaskFullDetail;
  @Input() private subtasks: Array<SubTask>;
  @Input() private activeSubtask: SubTask;

  @Input() private taskId: number;

  @Output() activeSubtaskUpdated = new EventEmitter();

  private totalPain: number;
  private totalLearning: number;

  private selectedShareType: string;

  private shareOptions: Array<any>; //need a shareType object, hard-coded for now


  public painChartData;

  private learningChartData;

  private painTags: Array<string>;
  private contextTags: Array<string>;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];


  constructor(private taskService: TaskService, private route: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {
    console.log("init!");
    if (!this.taskDetail) {
      console.log("task not loaded!");
    }
  }

  ngOnChanges() {

    if (this.taskDetail) {
      console.log("task detail!");

      this.drawLearningTable();
      this.drawPainTable();
    }
  }

  drawPainTable() {
    let durationByTag: Map<string, number> = new Map<string, number>();

    this.totalPain = 0;
    for (let subtask of this.taskDetail.ideaFlowStory.subtasks) {
      for (let journey of subtask.troubleshootingJourneys) {

        let hashtags = this.extractHashTagsFromJourney(journey);
        console.log("hashtags!"+hashtags);

        if (hashtags.size > 0) {
          this.totalPain += journey.durationInSeconds;
        }

        hashtags.forEach((hashtag: string) => {
          console.log("hashtag" + hashtag);
          let painDuration = durationByTag.get(hashtag);
          if (painDuration) {
            painDuration += journey.durationInSeconds;
          } else {
            painDuration = journey.durationInSeconds;
          }
          durationByTag.set(hashtag, painDuration);
        });


        let painTable = [];
        this.painTags = [];

        painTable.push(['ContextTag', 'Pain (minutes)']);

        durationByTag.forEach((value: number, key: string) => {
          painTable.push([key, value / 60]);
          this.painTags.push(key.toLowerCase());
        });

        this.sortTableDescending(painTable);

        if (this.totalPain > 0) {
          this.painChartData = {
            chartType: 'BarChart',
            dataTable: painTable,
            options: {
              title: 'Pain contributed by this IFM (minutes)',
              legend: {position: 'none'},
              colors: ['#FF0000'],
              height: painTable.length * 50,
              isStacked: true
            }
          };
        } else {
          this.painChartData = null;
        }

      }
    }
  }

  sortTableDescending(table) {
    table.sort((entry1,entry2) => {
      if (entry1[1] < entry2[1]) {
        return 1;
      }

      if (entry1[1] > entry2[1]) {
        return -1;
      }

      return 0;
    });

  }

  drawLearningTable() {

    let durationBySubtask = this.totalDurationsBySubtask();
    let durationByTag = this.totalDurationsByTag(durationBySubtask);

    let learningTable = [];
    this.contextTags = [];

    learningTable.push(['ContextTag', 'Learning (minutes)']);

    this.totalLearning = 0;

    durationByTag.forEach((value: number, key: string) => {
      learningTable.push([key, value / 60]);
      this.contextTags.push(key.toLowerCase());
      this.totalLearning += value;
    });

    this.sortTableDescending(learningTable);

    if (this.totalLearning > 0) {
      this.learningChartData = {
        chartType: 'BarChart',
        dataTable: learningTable,
        options: {
          title: 'Learning contributed by this IFM (minutes)',
          legend: {position: 'none'},
          colors: ['#0000FF'],
          height: learningTable.length * 50,
          isStacked: true
        }
      };
    } else {
      this.learningChartData = null;
    }

  }

  totalDurationsBySubtask() {
    let durationBySubtask: Map<number, number> = new Map<number, number>();

    this.taskDetail.subtaskTimelines.forEach((timeline, index) => {
      console.log("hello!");
      for (let band of timeline.ideaFlowBands) {
        if (band.type == "LEARNING") {
          let learningDuration = durationBySubtask.get(index);
          if (learningDuration) {
            learningDuration += band.durationInSeconds;
          } else {
            learningDuration = band.durationInSeconds;
          }
          console.log("durationBySubtask [" + index + ", " + learningDuration + "]");
          durationBySubtask.set(index, learningDuration);
        }
      }

    });
    return durationBySubtask;
  }

  totalDurationsByTag(durationBySubtask) {
    let durationByTag: Map<string, number> = new Map<string, number>();

    this.taskDetail.ideaFlowStory.subtasks.forEach((subtask, index) => {
      let subtaskDuration = durationBySubtask.get(index);
      if (!subtaskDuration) {
        subtaskDuration = 0;
      }

      let hashtags = this.extractHashTags(subtask.description);
      for (let hashtag of hashtags) {
        let tagDuration = durationByTag.get(hashtag);

        if (tagDuration) {
          tagDuration += subtaskDuration;
        } else {
          tagDuration = subtaskDuration;
        }
        console.log("durationByTag [" + hashtag + ", " + tagDuration + "]");
        durationByTag.set(hashtag, tagDuration);
      }
    });
    return durationByTag;
  }

  onTagChange() {
    console.log("On tag change!");
  }

  extractHashTagsFromJourney(journey ) {
    let allHashtags: Set<string> = new Set<string>();

    for (let painCycle of journey.painCycles) {
      let hashtags = this.extractHashTags(painCycle.description);
      for (let hashtag of hashtags) {
        console.log("hashtag: "+hashtag);
        allHashtags.add(hashtag);
      }
    }
    return allHashtags;
  }

  extractHashTags(string) {
    var hashTags, i, len, word, words;
    words = string.split(/[\s\r\n]+/);
    hashTags = [];
    for (i = 0, len = words.length; i < len; i++) {
      word = words[i];
      if (word.indexOf('#') === 0 && word.toLowerCase() != '#done') {
        hashTags.push(word);
      }
    }
    return hashTags;
  };

  goToSubtask(index, subtask) {
    let selectedSubtask = {index: index, subtask: subtask};
    this.activeSubtaskUpdated.emit(selectedSubtask);
  }

  goToGlossary(hashTag) {
    if (hashTag) {
      let hashTagWithoutPound = hashTag.substring(1, hashTag.length);
      this.router.navigate(['/glossary/task/' + this.taskId + '/tag/' + hashTagWithoutPound]);
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
