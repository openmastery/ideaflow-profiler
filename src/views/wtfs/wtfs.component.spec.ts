/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {HaystackComponent} from "./haystack.component";
import {WtfsComponent} from "./wtfs.component";


describe('WtfsComponent', () => {
  let component: WtfsComponent;
  let fixture: ComponentFixture<WtfsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WtfsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WtfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
