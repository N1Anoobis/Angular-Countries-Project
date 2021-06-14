import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  ChangeDetectionStrategy,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TabComponent } from './tab/tab.component';
// import { DynamicTabsDirective } from './dynamic-tabs.directive';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements AfterContentInit, OnInit {
  @Input() urlParam;

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) => tab.active);
    const firstParam: string = this.route.snapshot.queryParamMap.get('tab');
    if (!firstParam) {
      // if there is no active tab set, activate the first
      if (activeTabs.length === 0) {
        this.selectTab(this.tabs.first);
      }
    } else {
      this.setTab(firstParam);
    }
  }

  selectTab(tab: any) {
    this.tabs.toArray().forEach((tab) => (tab.active = false));
    // activate the tab the user has clicked on.
    tab.active = true;
  }

  setTab(title) {
    this.tabs.toArray().forEach((tab) => (tab.active = false));
    this.tabs
      .toArray()
      .filter(
        (tab) =>
          tab.title.toUpperCase() === title.toUpperCase() && (tab.active = true)
      );
  }
}
