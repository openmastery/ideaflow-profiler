import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [],
  styleUrls: ["./login.scss"],
  encapsulation:  ViewEncapsulation.None
})

export class LoginComponent implements OnInit, OnDestroy {

    protected title:string  = 'Welcome to Hell!';
    public view:any = {
        authenticated:  false,
        email:          '',
        password:       ''
    };

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
