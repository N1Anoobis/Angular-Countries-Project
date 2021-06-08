import { Component, Input, OnInit } from '@angular/core';

const constants = {
  PAGE_SIZE: 5,
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() data;
  @Input() pageSize = constants.PAGE_SIZE;
  keyes;
  items;
  page = 0;
  pageData = {} as {
    start: number;
    end: number;
  };

  constructor() {}

  ngOnInit() {
    if (this.data[0]) {
      this.keyes = Object.keys(this.data[0]);
    }
    this.initPagination();
  }
  private initPagination(): void {
    this.paginate(this.page, this.pageSize);
  }
  private paginate(page: number, pageSize: number): void {
    const startPortion = page * pageSize;
    let endPortion = startPortion + pageSize;
    if (endPortion > this.size) {
      endPortion -= endPortion - this.size;
    }
    this.saveCalculatedPortion(startPortion, endPortion);

    this.items = [...this.data.slice(startPortion, endPortion)];
  }
  private saveCalculatedPortion(start: number, end: number): void {
    this.pageData = {
      ...this.pageData,
      start,
      end,
    };
  }

  public get size(): number {
    return this.data.length;
  }

  public get totalPages(): number {
    return Math.ceil(this.size / this.pageSize);
  }

  public prev(): void {
    if (this.page > 0) {
      this.page -= 1;
      this.paginate(this.page, this.pageSize);
    }
  }

  public next(): void {
    if (this.page < this.totalPages && this.pageData.end < this.size) {
      this.page += 1;
      this.paginate(this.page, this.pageSize);
    }
  }
}
