import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'population'
})
export class PopulationPipe implements PipeTransform {

  transform(value: number): string {
    if(value <= 1000) {
      return `${value} people`;
    }
    return `${(value / 1000).toFixed()} thousands`;
  }

}
