import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MomentModule } from 'angular2-moment/moment.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import { Task } from '../../models/task';
import { TaskTimeline } from '../../models/taskTimeline';
import { TaskService } from '../../services'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  encapsulation:  ViewEncapsulation.None
})
export class TaskComponent implements OnInit {
  private id: string;
  private sub: any;
  private taskTimeline: TaskTimeline;
  private task : Task;
  private errorMessage: string;
  private taskName : string = 'US 23523423';
  private that : any = this;

  public timelineChartOptions:any =  {
   chartType: 'Timeline',
   dataTable: [
     ['Name', 'From', 'To'],
     [ 'Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
     [ 'Adams',      new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
     [ 'Washington', new Date(1801, 2, 4),  new Date(1809, 2, 4) ]
   ]
  }


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  constructor(private taskService: TaskService, private route: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.getTimeline(this.id);
  }

  goToGlossary(hashTag) {
    if(hashTag){
      let hashTagWithoutPound = hashTag.substring(1, hashTag.length);
      this.router.navigate(['/glossary/task/'+this.id+'/tag/'+hashTagWithoutPound]);
    }
  }

  getTimeline(taskId) {
    this.taskService.getTimeline(taskId)
    .subscribe(
      taskTimeline => this.setTimeline(taskTimeline),
      error =>  this.errorMessage = <any>error
    );
  }

  setTimeline(taskTimeline){
    if(taskTimeline.hasOwnProperty('ideaFlowStory')){

      if (taskTimeline.ideaFlowStory.hasOwnProperty('capacityDistribution')) {
        let capacityDistribution = taskTimeline.ideaFlowStory.capacityDistribution;

        let capacityTotal = 0;
        for (let capacityType in capacityDistribution) {
          capacityTotal+=capacityDistribution[capacityType];
        }
        let percentages = new Array();
        for (let capacityType in capacityDistribution) {
          percentages.push({
            'name': capacityType,
            'value': ((capacityDistribution[capacityType]/capacityTotal) * 100).toFixed(0) + '%'
          });
        }
        capacityDistribution.capatityTotal = capacityTotal;
        capacityDistribution.percentages = percentages;
      }

      if(taskTimeline.ideaFlowStory.hasOwnProperty('subtasks')){

        let subtasks = taskTimeline.ideaFlowStory.subtasks;
        for(let subtask of subtasks){

          if(subtask.hasOwnProperty('capacityDistribution')){
            let capacityTotal = 0;
            for (let capacityType in subtask.capacityDistribution) {
              capacityTotal+=subtask.capacityDistribution[capacityType];
            }
            let percentages = new Array();
            for (let capacityType in subtask.capacityDistribution) {
              percentages.push({
                'name': capacityType,
                'value': ((subtask.capacityDistribution[capacityType]/capacityTotal) * 100).toFixed(0) + '%'
              });
            }
            subtask.capacityDistribution.capatityTotal = capacityTotal;
            subtask.capacityDistribution.percentages = percentages;
          }
        }
      }
    }
    this.taskTimeline = taskTimeline;
  }

  //TODO why doesn't this work?
  static calculateCapacities(capacityDistribution) {
    let capacityTotal = 0;
    for (let capacityType in capacityDistribution) {
      capacityTotal+= capacityDistribution[capacityType];
    }
    let percentages = new Array();
    for (let capacityType in capacityDistribution) {
      percentages.push({
        'name': capacityType,
        'value': ((capacityDistribution[capacityType]/capacityTotal) * 100).toFixed(0) + '%'
      });
    }
    capacityDistribution.capatityTotal = capacityTotal;
    capacityDistribution.percentages = percentages;
  }

}
