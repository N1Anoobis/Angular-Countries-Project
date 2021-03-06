import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavItem } from './navigation.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  navigationData: NavItem[] = [
    {
      name: 'Continents',
      path: ['/continents'],
    },
    {
      name: 'CreateContinent',
      path: ['create/continent'],
    },
    {
      name: 'Countries',
      path: ['/countries'],
    },
    {
      name: 'Cities',
      path: ['/cities'],
    },
    {
      name: 'CreateCity',
      path: ['cities/create'],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
