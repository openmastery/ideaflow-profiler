import {Component, OnInit, ViewEncapsulation, ElementRef} from '@angular/core';
import { MomentModule } from 'angular2-moment/moment.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Definition } from '../../models/definition';
import { GlossaryService } from '../../services';
import {Input} from "@angular/core/src/metadata/directives";
import {ViewChild} from "@angular/core/src/metadata/di";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  encapsulation:  ViewEncapsulation.None
})

export class TermsComponent implements OnInit {
  @ViewChild('terms') private chartContainer: ElementRef;
  @Input() private taskId: number;
  @Input() private hashtags: Array<string>;

  private glossary: Definition[];
  private errorMessage: string;


  constructor( private glossaryService: GlossaryService, private route: ActivatedRoute, public router: Router ) {

  }

  ngOnInit() {
      // this.route.params.subscribe(params => {
      //   if (params['tag']) {
      //     this.initTaskDefinitions(+params['id'], params['tag'])
      //   } else {
      //     this.initAllDefinitions();
      //   }
      // });
  }

  ngOnChanges() {
    if (this.taskId) {
      this.initTaskDefinitions(this.taskId);
    }
  }


  onSaveTerm(definition) {
    console.log("Handle save!" +definition.description);
    if (definition.description) {
      this.glossaryService.updateTerm(definition)
        .subscribe(
          taskDetail => console.log('happiness!'),
          error => console.log(error)
        );
    }

  }

  private initTaskDefinitions(taskId) {
    this.glossaryService.getTaskDefinitions(taskId)
      .subscribe(
        glossary => this.setGlossary(glossary),
        error =>  this.errorMessage = <any>error);
  }

  private initAllDefinitions() {
    this.glossaryService.getAllDefinitions()
    .subscribe(
      glossary => this.setGlossary(glossary),
      error =>  this.errorMessage = <any>error);
  }

  private setGlossary(definitions){
    let selectedDefinitions = [];

    for (let definition of definitions) {
      if (this.hashtags && this.hashtags.some(tag =>tag==definition.name.toLowerCase())) {
        console.log("list defn:"+definition.name);
        selectedDefinitions.push(definition);
      }
    }

    this.glossary = this.sortGlossary(selectedDefinitions,"name");
  }

  private sortGlossary(list,property){
    list.sort(function(a, b) {
      var nameA = a[property];
      var nameB = b[property];
      nameA = (typeof nameA === 'string') ? nameA.toUpperCase() : nameA;
      nameB = (typeof nameB === 'string') ? nameB.toUpperCase() : nameB;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    return list;
  }
}
