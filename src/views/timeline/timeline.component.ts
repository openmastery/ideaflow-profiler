import {Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';

import * as Kinetic from 'Kinetic';
import {Timeline} from "../../models/taskDetail/timeline";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimelineComponent implements OnInit, OnChanges {
  @ViewChild('timeline') private chartContainer: ElementRef;
  @Input() private data: Timeline;
  private margin: any = {top: 20, bottom: 20, left: 20, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private bandMargin: any = 20;
  private sideMargin: any = 50;
  private bottomMargin: any = 50;
  private topMargin: any = 30;//this.bottomMargin;


  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  private stage: any;

  private endOfTimeline: any;
  private secondsPerUnit: any;

  private bandsById: Array<any> = [];
  private eventsById: Array<any> = [];
  private executionEventLayer: any;

  private ideaFlowIsVisible: boolean = true;
  private wtfIsVisible: boolean = true;
  private distractionIsVisible: boolean = false;
  private executionIsVisible: boolean = false;
  private calendarIsVisible: boolean = true;

  private missingId: number = 1;

  constructor() {
  }

  ngOnInit() {
    if (this.data) {
      this.drawTimeline(this.data);
      //this.updateChart();
    }
  }

  ngOnChanges() {
    console.log("ngOnChanges");
  }

  toggleOverlay() {
    //this.toggleIdeaFlows();
  }

  drawTimeline(timelineData) {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth;
    this.height = element.offsetHeight;
    this.endOfTimeline = this.getEndOfTimeline(timelineData);
    this.secondsPerUnit = this.getSecondsPerUnit(timelineData);

    console.log('width =' + this.width);
    console.log('height = ' + this.height);

    console.log('timeline = ' + this.data.events);

    this.stage = new Kinetic.Stage({container: 'timeline', width: this.width, height: this.height});
    this.drawUngroupedTimebands(this.stage, this.data, this.secondsPerUnit);
    this.drawMainTimeline(this.stage, this.formatShort(0), this.formatShort(this.endOfTimeline));
    this.drawEvents(this.stage, this.data.events, this.secondsPerUnit);
    this.drawExecutionEvents(this.stage, this.data.executionEvents, this.secondsPerUnit)
  }

  getEndOfTimeline(timelineData) {
    return timelineData.relativePositionInSeconds + timelineData.durationInSeconds;
  }

  getSecondsPerUnit(timelineData) {
    return (this.getEndOfTimeline(timelineData) / (this.width - (2 * this.sideMargin)));
  }

  formatShort(duration) {
    let d = Number(duration);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    return ( h + ":" + (m < 10 ? "0" : "") + m);
  }

  drawMainTimeline(stage, startTick, endTick) {
    let layer = new Kinetic.Layer();
    let tickHeight = 10;
    let tickMargin = 5;
    let startTickLabel = new Kinetic.Text({
      x: this.sideMargin - tickMargin,
      y: this.height - this.bottomMargin,
      text: startTick,
      fontSize: 13,
      align: 'right',
      fontFamily: 'Calibri',
      fill: 'black'
    });
    startTickLabel.setOffset({x: startTickLabel.getWidth()});

    let endTickLabel = new Kinetic.Text({
      x: this.width - this.sideMargin + tickMargin,
      y: this.height - this.bottomMargin,
      text: endTick,
      fontSize: 13,
      fontFamily: 'Calibri',
      fill: 'black'
    });

    let line = new Kinetic.Line({
      points: [
        this.sideMargin, this.height - this.bottomMargin + tickHeight,
        this.sideMargin, this.height - this.bottomMargin,
        this.width - this.sideMargin, this.height - this.bottomMargin,
        this.width - this.sideMargin, this.height - this.bottomMargin + tickHeight
      ],
      stroke: 'black',
      strokeWidth: 3,
      lineCap: 'square',
      lineJoin: 'round',
      tension: 0,
    });

    layer.add(line);
    layer.add(startTickLabel);
    layer.add(endTickLabel);
    stage.add(layer);

  }

  drawExecutionEvents(stage, executionEvents, secondsPerUnit) {
    let that = this;

    this.executionEventLayer = new Kinetic.Layer();
    executionEvents.forEach(function (executionEvent) {

      let eventInfo = that.drawExecutionEventLine(that.executionEventLayer , executionEvent, secondsPerUnit);
      //that.executionEventsById[executionEvent.fullPath] = eventInfo;

    });

    this.stage.add(that.executionEventLayer);
  }


  drawEvents(stage, events, secondsPerUnit) {
    let that = this;
    events.forEach(function (event) {

      let eventInfo = that.drawEventLine(stage, event, secondsPerUnit);
      that.eventsById[event.fullPath] = eventInfo;

      eventInfo.layer.on('mouseover touchstart', function () {
        that.highlightEventLine(eventInfo)
      });
      eventInfo.layer.on('mouseout touchend', function () {
        that.restoreEventLine(eventInfo)
      });

    });
  }

  drawExecutionEventLine(layer, executionEvent, secondsPerUnit) {

    let offset = Math.round(executionEvent.relativePositionInSeconds / secondsPerUnit) + this.sideMargin;
    let tickHeight = 15;
    let tickMargin = 3;
    let color = '#ff0000';

    let strokeWidth = 1;

    console.log("execution: "+offset);

    var eventLine = new Kinetic.Line({
      points: [
        offset, this.topMargin,
        offset, this.height - this.bottomMargin + tickHeight
      ],
      stroke: color,
      strokeWidth: strokeWidth,
      lineCap: 'round',
      tension: 0,
    });
    //TODO turning this on seems to run the browser out of memory
     //layer.add(eventLine);
    //
    // return {data: executionEvent, color: color, line: eventLine, tick: null, layer: layer};

  }

  drawEventLine(stage, event, secondsPerUnit) {
    let layer = new Kinetic.Layer();
    let offset = Math.round(event.relativePositionInSeconds / secondsPerUnit) + this.sideMargin;
    let tickHeight = 15;
    let tickMargin = 3;
    let color = '#cccccc';

    let strokeWidth = 2;


    console.log(event.type);

    if (event.type == 'SUBTASK') {
      strokeWidth = 2;
      color = 'black';
    }

    var eventLine = new Kinetic.Line({
      points: [
        offset, this.topMargin,
        offset, this.height - this.bottomMargin + tickHeight
      ],
      stroke: color,
      strokeWidth: strokeWidth,
      lineCap: 'round',
      tension: 0,
    });

    if (event.type == 'CALENDAR') {
      eventLine.dash([5, 5]);
      eventLine.setPoints([offset, 0, offset, this.height - 10]);
    }


    layer.add(eventLine);


    if (event.type == 'SUBTASK') {
      var tickLabel = new Kinetic.Text({
        x: offset,
        y: this.height - this.bottomMargin + tickHeight + tickMargin,
        text: this.formatShort(event.relativePositionInSeconds),
        align: 'center',
        fontSize: 13,
        fontFamily: 'Calibri',
        fill: 'black'
      });
      tickLabel.setOffset({x: tickLabel.getWidth() / 2});
      layer.add(tickLabel);
    }


    if (event.type == 'WTF' || event.type == 'AWESOME') {
      this.drawImageAnnotation(layer, event.type, offset, this.topMargin);
    }

    stage.add(layer);

    return {data: event, color: color, line: eventLine, tick: tickLabel, layer: layer};

  }

  drawImageAnnotation(layer, type, x, y) {
    let width = 18;
    let xoffset = x - width / 2;
    let yoffset = y - 20;

    var imageObj = new Image();
    if (type == 'WTF') {
      imageObj.src = '/assets/pain_flame.png';
    } else if (type == 'AWESOME') {
      imageObj.src = '/assets/awesome_flame.png';
    }

    imageObj.onload = function () {
      var image = new Kinetic.Image({
        x: xoffset,
        y: yoffset,
        image: imageObj,
        width: 18,
        height: 20
      });
      layer.add(image);
      layer.draw();
    };

  }

  highlightEventLine(eventInfo) {
    eventInfo.line.setStroke('#d3e0ff');
    if (eventInfo.tick) {
      eventInfo.tick.setFill('#79a1ff');
    }
    eventInfo.layer.draw();
  }


  restoreEventLine(eventInfo) {
    eventInfo.line.setStroke(eventInfo.color);
    if (eventInfo.tick) {
      eventInfo.tick.setFill('black');
    }
    eventInfo.layer.draw();
  }


  drawUngroupedTimebands(stage, timelineData, secondsPerUnit) {
    console.log('drawUngroupedTimebands');

    let that = this;

    timelineData.ideaFlowBands.forEach(function (band) {
      console.log('each');
      if (band.type != "PROGRESS") {
        let groupLayer = new Kinetic.Layer();
        let bandGroup = that.drawBandGroup(groupLayer, band, secondsPerUnit);
        bandGroup.layer.on('mouseover touchstart', function () {
          that.highlightBandGroup(bandGroup)
        });
        bandGroup.layer.on('mouseout touchend', function () {
          that.restoreBandGroup(bandGroup)
        });
        stage.add(groupLayer);
      }
    });
  }

  toggleIdeaFlows(isVisible) {
    console.log("toggle flows = "+isVisible);
    for (var key in this.bandsById) {
      if (this.bandsById.hasOwnProperty(key)) {

        let bandGroupInfo = this.bandsById[key];
        if (isVisible) {
          bandGroupInfo.layer.show();
        } else {
          bandGroupInfo.layer.hide();
        }
        bandGroupInfo.layer.draw();
      }
    }
  }

  toggleWTFs(isVisible) {
    console.log("toggle WTFs = "+isVisible);
    for (var key in this.eventsById) {
      if (this.eventsById.hasOwnProperty(key)) {
        let eventInfo = this.eventsById[key];
        //return {data: event, color: color, line: eventLine, tick: tickLabel, layer: layer};
        if (eventInfo.data.type == 'WTF' || eventInfo.data.type == "AWESOME") {
          if ( isVisible) {
            eventInfo.layer.show();
          } else {
            eventInfo.layer.hide();
          }
          eventInfo.layer.draw();
        }
      }
    }
  }

  toggleCalendar(isVisible) {
    console.log("toggle Calendar = "+isVisible);
    for (var key in this.eventsById) {
      if (this.eventsById.hasOwnProperty(key)) {
        let eventInfo = this.eventsById[key];
        //{data: event, color: color, line: eventLine, tick: tickLabel, layer: layer};
        if (eventInfo.data.type == 'CALENDAR') {
          if ( isVisible) {
            eventInfo.layer.show();
          } else {
            eventInfo.layer.hide();
          }
          eventInfo.layer.draw();
        }
      }
    }
  }

  toggleDistraction(isVisible) {
    console.log("toggle Distraction = "+isVisible);
    for (var key in this.eventsById) {
      if (this.eventsById.hasOwnProperty(key)) {
        let eventInfo = this.eventsById[key];
        //{data: event, color: color, line: eventLine, tick: tickLabel, layer: layer};
        if (eventInfo.data.type == 'DISTRACTION') {
          if ( isVisible) {
            eventInfo.layer.show();
          } else {
            eventInfo.layer.hide();
          }
          eventInfo.layer.draw();
        }
      }
    }
  }

  toggleExecution(isVisible) {
    console.log("toggle Execution = "+isVisible);
    // if (isVisible) {
    //   this.executionEventLayer.show();
    // } else {
    //   this.executionEventLayer.hide();
    // }
    // this.executionEventLayer.draw();
  }


  drawBandGroup(groupLayer, band, secondsPerUnit) {
    console.log('drawBandGroup');
    let bandGroup = this.createBandGroup(groupLayer, band, secondsPerUnit);
    this.bandsById[bandGroup.id] = bandGroup;  //TODO

    return bandGroup;
  }

  createBandGroup(groupLayer, band, secondsPerUnit) {
    console.log('createBandGroup');
    band.id = band.fullPath;
    if (isNullOrUndefined(band.id)) {
      band.id = '/band/' + this.missingId++;
    }

    let groupInfo = {id: band.id, bandInfos: [], layer: groupLayer};

    let colorBand = this.drawBand(groupLayer, band, secondsPerUnit);
    let bandInfo = {data: band, rect: colorBand};

    groupInfo.bandInfos.push(bandInfo);

    return groupInfo;
  }

  drawBand(layer, band, secondsPerUnit) {
    console.log('drawBand');
    var offset = Math.round(band.relativePositionInSeconds / secondsPerUnit) + this.sideMargin;
    var size = Math.round(band.durationInSeconds / secondsPerUnit);

    var colorBand = new Kinetic.Rect({
      x: offset,
      y: this.topMargin + this.bandMargin,
      width: size,
      height: this.height - this.bottomMargin - this.topMargin - this.bandMargin,
      fill: this.lookupBandColors(band.type)[0],
      stroke: this.lookupBandColors(band.type)[1],
      strokeWidth: 1
    });

    layer.add(colorBand);
    return colorBand;
  }

  highlightBandGroup(groupInfo) {
    let that = this;
    groupInfo.bandInfos.forEach(function (bandInfo) {
      bandInfo.rect.setFill(that.lookupBandColors(bandInfo.data.type)[1])
    });
    groupInfo.layer.draw();

  }

  restoreBandGroup(groupInfo) {
    let that = this;
    groupInfo.bandInfos.forEach(function (bandInfo) {
      bandInfo.rect.setFill(that.lookupBandColors(bandInfo.data.type)[0])
    });
    groupInfo.layer.draw();
  }




  lookupBandColors(bandType) {
    if (bandType == 'TROUBLESHOOTING') {
      return ['#ff0078', '#FF90D1', '#FFDEF6']
    } else if (bandType == 'LEARNING') {
      return ['#520ce8', '#9694E8', '#EDE2FD']
    } else if (bandType == 'REWORK') {
      return ['#ffcb01', '#FFEA7C', '#FFF5A7']
    } else {
      throw "Unable to find color for bandType: " + bandType
    }
  }


  drawBandOld() {
    let layer = new Kinetic.Layer();

    var colorBand = new Kinetic.Rect({
      x: 3,
      y: 3,
      width: 100,
      height: 100,
      fill: '#ff0078',
      stroke: '#ff0078',
      strokeWidth: 1
    });

    layer.add(colorBand);
    this.stage.add(layer);
    this.stage.draw();
  }


  // createChart() {
  //   let element = this.chartContainer.nativeElement;
  //   this.width = element.offsetWidth - this.margin.left - this.margin.right;
  //   this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
  //   let svg = d3.select(element).append('svg')
  //     .attr('width', element.offsetWidth)
  //     .attr('height', element.offsetHeight);
  //
  //   // chart plot area
  //   this.chart = svg.append('g')
  //     .attr('class', 'bars')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  //
  //   // define X & Y domains
  //   let xDomain = this.data.map(d => d[0]);
  //   let yDomain = [0, d3.max(this.data, d => d[1])];
  //
  //   // create scales
  //   this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
  //   this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);
  //
  //   // bar colors
  //   this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);
  //
  //   // x & y axis
  //   this.xAxis = svg.append('g')
  //     .attr('class', 'axis axis-x')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
  //     .call(d3.axisBottom(this.xScale));
  //   this.yAxis = svg.append('g')
  //     .attr('class', 'axis axis-y')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
  //     .call(d3.axisLeft(this.yScale));
  // }
  //
  // updateChart() {
  //   // update scales & axis
  //   this.xScale.domain(this.data.map(d => d[0]));
  //   this.yScale.domain([0, d3.max(this.data, d => d[1])]);
  //   this.colors.domain([0, this.data.length]);
  //   this.xAxis.transition().call(d3.axisBottom(this.xScale));
  //   this.yAxis.transition().call(d3.axisLeft(this.yScale));
  //
  //   let update = this.chart.selectAll('.bar')
  //     .data(this.data);
  //
  //   // remove exiting bars
  //   update.exit().remove();
  //
  //   // update existing bars
  //   this.chart.selectAll('.bar').transition()
  //     .attr('x', d => this.xScale(d[0]))
  //     .attr('y', d => this.yScale(d[1]))
  //     .attr('width', d => this.xScale.bandwidth())
  //     .attr('height', d => this.height - this.yScale(d[1]))
  //     .style('fill', (d, i) => this.colors(i));
  //
  //   // add new bars
  //   update
  //     .enter()
  //     .append('rect')
  //     .attr('class', 'bar')
  //     .attr('x', d => this.xScale(d[0]))
  //     .attr('y', d => this.yScale(0))
  //     .attr('width', this.xScale.bandwidth())
  //     .attr('height', 0)
  //     .style('fill', (d, i) => this.colors(i))
  //     .transition()
  //     .delay((d, i) => i * 10)
  //     .attr('y', d => this.yScale(d[1]))
  //     .attr('height', d => this.height - this.yScale(d[1]));
  // }
}
