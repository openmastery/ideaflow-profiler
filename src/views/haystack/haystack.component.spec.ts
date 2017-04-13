/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {HaystackComponent} from "./haystack.component";


describe('HaystackComponent', () => {
  let component: HaystackComponent;
  let fixture: ComponentFixture<HaystackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaystackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaystackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
