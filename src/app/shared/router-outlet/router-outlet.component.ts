import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-router-outlet',
  templateUrl: './router-outlet.component.html',
  styleUrls: ['./router-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterOutletComponent {}
