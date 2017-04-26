import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MomentModule } from 'angular2-moment/moment.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Definition } from '../../models/definition';
import { GlossaryService } from '../../services';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss'],
  encapsulation:  ViewEncapsulation.None
})

export class GlossaryComponent implements OnInit {
  private glossary: Definition[];
  private errorMessage: string;

  constructor( private glossaryService: GlossaryService, private route: ActivatedRoute, public router: Router ) {

  }

  ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['tag']) {
          this.getTaskDefinitions(+params['id'], params['tag'])
        } else {
          this.getAllDefinitions();
        }
      });
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


  private getTaskDefinitions(taskId, tag) {
    this.glossaryService.getTaskDefinitions(taskId)
      .subscribe(
        glossary => this.setGlossary(glossary),
        error =>  this.errorMessage = <any>error);
  }

  private getAllDefinitions() {
    this.glossaryService.getAllDefinitions()
    .subscribe(
      glossary => this.setGlossary(glossary),
      error =>  this.errorMessage = <any>error);
  }

  private setGlossary(response){
    this.glossary = this.sortGlossary(response,"name");
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
