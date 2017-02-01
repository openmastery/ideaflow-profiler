/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GlossaryComponent } from './glossary.component';

describe('GlossaryComponent', () => {
  let component: GlossaryComponent;
  let fixture: ComponentFixture<GlossaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlossaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlossaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
