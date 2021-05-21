import { EventEmitter } from "@angular/core";
import { ContinentI } from "src/typings";

export class ContinentService {
continentsChanged = new EventEmitter<ContinentI[]>()

  private  continents: Array<ContinentI> = [
    {
      entity: 'continent',
      id: 'europe',
      name: 'Europe',
      area: 10523000,
      population: 746419440,
      populationDensity: 72.9,
      minHeight: 28,
      maxHeight: 4811,
    },
    {
      entity: 'continent',
      id: 'asia',
      name: 'Asia',
      area: 44600000,
      population: 4560667108,
      populationDensity: 100,
      minHeight: 422,
      maxHeight: 8848,
    },
    {
      entity: 'continent',
      id: 'africa',
      name: 'Africa',
      area: 30370000,
      population: 1275920972,
      populationDensity: 36.4,
      minHeight: 153,
      maxHeight: 5895,
    },
    {
      entity: 'continent',
      id: 'antarctica',
      name: 'Antarctica',
      area: 14200000,
      population: 4400,
      populationDensity: 0.00031,
      minHeight: 2870,
      maxHeight: 4892,
    },
    {
      entity: 'continent',
      id: 'australia',
      name: 'Australia',
      area: 7741220,
      population: 39000000,
      populationDensity: 4.2,
      minHeight: 15,
      maxHeight: 2228,
    },
    {
      entity: 'continent',
      id: 'north-america',
      name: 'North America',
      area: 24709000,
      population: 579024000,
      populationDensity: 22.9,
      minHeight: 86,
      maxHeight: 6194,
    },
    {
      entity: 'continent',
      id: 'south-america',
      name: 'South America',
      area: 17840000,
      population: 423581078,
      populationDensity: 21.4,
      minHeight: 105,
      maxHeight: 6962,
    },
  ];

  getContinents() {
    return this.continents.slice()
  }

  removeContinent(name: string) {
    const continents = []
    this.continents.filter(item => {
      if(item.name !== name){
        continents.push(item)
      }

    })
this.continents = continents

    console.log(continents)
  }
}
