import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { RootComponent } from './root.component';

@Component({
  selector: 'diadev-navigation',
  template: '',
})
export class DummyNavigationComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootComponent, DummyNavigationComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RootComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'carbotracker'`, () => {
    const fixture = TestBed.createComponent(RootComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('carbotracker');
  });
});
