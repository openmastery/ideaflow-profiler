import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [],
  styleUrls: ['./login.scss'],
  encapsulation:  ViewEncapsulation.None
})

export class LoginComponent implements OnInit, OnDestroy {
  protected apikey = '0beaf44c-6138-4f20-a8f7-c63393cd6f2e';
  protected title  = 'Welcome to Hell!';
  public view: any = {
      authenticated:  false,
      email:          '',
      password:       ''
  };

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  login() {
    this.router.navigate(['/IdeaFlow']);
    return false;
  }

}
