import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FaqSummary } from '../../models/faqSummary';
import { FaqService } from '../../services';
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

  constructor( private faqService: FaqService, public router: Router ) {

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

}
