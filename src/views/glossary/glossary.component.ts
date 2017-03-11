import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MomentModule } from 'angular2-moment/moment.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
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

  constructor( private glossaryService: GlossaryService, public router: Router ) {

  }

  ngOnInit() {
    this.getDefinitions();
  }

  private getDefinitions() {
    this.glossaryService.getDefinitions()
    .subscribe(
      glossary => this.setGlossary(glossary),
      error =>  this.errorMessage = <any>error);
  }

  private getMore(){
    console.log('get more');
  }

  private setGlossary(response){
    this.glossary = this.sortGlossary(response,"name");
  }

  private sortGlossary(list,property){
    list.sort(function(a, b) {
      var nameA = a[property].toUpperCase();
      var nameB = b[property].toUpperCase();
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
