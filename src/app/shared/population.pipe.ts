import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'population'
})
export class PopulationPipe implements PipeTransform {

  transform(value: number): string {
    return `${(value / 1000).toFixed()} thousands`;
  }

}
