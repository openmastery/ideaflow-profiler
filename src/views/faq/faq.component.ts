import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FaqSummary } from '../../models/faqSummary';
import { FaqService, SearchService } from '../../services';
import {Router} from "@angular/router";



@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation:  ViewEncapsulation.None
})
export class FaqComponent implements OnInit {
  private faqs: FaqSummary[];
  private errorMessage: string;

  private searchResults: FaqSummary[];
  private query = '';
  private lastQuery = '';
  private searchError: string;

  constructor(private faqService: FaqService, private searchService: SearchService,
              public router: Router) {
  }

  ngOnInit() {
    this.getFaqs();
  }

  private getFaqs() {
    this.faqService.getFaqs()
      .subscribe(
        faqs => this.setFaqs(faqs),
        error =>  this.errorMessage = <any>error);
  }

  private setFaqs(response){
    this.faqs = response;
  }

  goToFaq(fullPath){
    if(fullPath != null){
      this.router.navigate([fullPath.substr(1, fullPath.length - 1)]);
    }
  }

  private search(query: string) {
    this.lastQuery = String(query);
    this.searchError = null;

    if (query.trim().length === 0) {
      this.searchResults = null;
      return;
    }

    this.searchService.searchFaqSummaries(query.split(' '))
      .subscribe(
        faqs => this.searchResults = faqs,
        error => {
          this.searchError = error;
          this.searchResults = null;
        },
      );
  }

  private showAllIfEmpty(query) {
    if (query.trim().length === 0) {
      this.searchError = null;
      this.searchResults = null;
    }
  }

}
