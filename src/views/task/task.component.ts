import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  encapsulation:  ViewEncapsulation.None
})
export class TaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
