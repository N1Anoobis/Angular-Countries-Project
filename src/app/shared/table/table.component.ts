import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() items;
  keyes;
  constructor() {}

  ngOnInit() {}

  ngAfterInit(): void {
    if (this.items) {
      this.keyes = Object.keys(this.items[0]);
    }
  }
}
