import { Component, Input, OnInit } from '@angular/core';

const constants = {
  PAGE_SIZE: 2,
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
    const startPoint = page * pageSize;
    let endPoint = startPoint + pageSize;

    if (endPoint > this.size) {
      endPoint = this.size;
    }
    this.saveCalculatedPoint(startPoint, endPoint);

    this.items = [...this.data.slice(startPoint, endPoint)];
  }
  private saveCalculatedPoint(start: number, end: number): void {
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

  public get paginationNumbers(): number[] {
    const pageNumbers: number[] | null = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
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

  public handlePaginate(pageNr: number): void {
    this.page = pageNr - 1;
    this.paginate(this.page, this.pageSize);
  }
}
