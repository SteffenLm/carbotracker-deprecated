import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'diadev-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  public navigationItems: { path: string; text: string }[] = [
    {
      path: '/products',
      text: 'products',
    },
    {
      path: '/current-meal',
      text: 'current meal',
    },
    // {
    //   path: '/life-events',
    //   text: 'life events',
    // },
    // {
    //   path: '/carbo-factors',
    //   text: 'carbo factors',
    // },
    // {
    //   path: 'settings',
    //   text: 'settings',
    // },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
