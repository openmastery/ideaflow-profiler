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

  private query: string;
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

  search(query: string) {
    this.searchService.searchFaqSummaries(query.split(' '))
      .subscribe(
        faqs => this.faqs = faqs,
        error => this.searchError = error,
      );
  }

}
