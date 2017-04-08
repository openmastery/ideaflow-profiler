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

  private chartData: Array<any>;


  constructor(private taskService: TaskService, private route: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.getTimeline(this.id);

    // give everything a chance to get loaded before starting the animation to reduce choppiness
    setTimeout(() => {
      this.generateData();

      // change the data periodically
      setInterval(() => this.generateData(), 3000);
    }, 1000);
  }

  generateData() {
    this.chartData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
      this.chartData.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
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
    this.taskTimeline = taskTimeline;
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
