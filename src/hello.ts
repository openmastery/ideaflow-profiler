import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
  selector: '.hello-test',
  template: '<h1>I&apos;ve been replaced!</h1>'
})
export class HelloTest {

}

bootstrap(HelloTest);
