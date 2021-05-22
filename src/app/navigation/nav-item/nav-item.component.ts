import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NavItem } from '../navigation.model';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemComponent implements OnInit {
  @Input() navigationData: NavItem;
  constructor() {}

  ngOnInit(): void {}
}
