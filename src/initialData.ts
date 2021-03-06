import { CityI, CountryI, ContinentI } from './typings';

export const countries: CountryI[] = [
  {
    entity: 'country',
    id: 'afganistan',
    name: 'Afganistan',
    continent: 'Asia',
    area: 652230,
    population: 30419928,
    populationDensity: 45.74,
  },
  {
    entity: 'country',
    id: 'albania',
    name: 'Albania',
    continent: 'Europe',
    area: 28748,
    population: 3195000,
    populationDensity: 111.1,
  },
  {
    entity: 'country',
    id: 'burundi',
    name: 'Burundi',
    continent: 'Africa',
    area: 27830,
    population: 8691000,
    populationDensity: 312,
  },
  {
    entity: 'country',
    id: 'dominican-republic',
    name: 'Dominican Republic',
    continent: 'North America',
    area: 48730,
    population: 9049595,
    populationDensity: 185,
  },
  {
    entity: 'country',
    id: 'ecuador',
    name: 'Ecuador',
    continent: 'South America',
    area: 283560,
    population: 13928000,
    populationDensity: 49,
  },
  {
    entity: 'country',
    id: 'poland',
    name: 'Poland',
    continent: 'Europe',
    area: 652230,
    population: 30419928,
    populationDensity: 45.74,
  },
  {
    entity: 'country',
    id: 'micronesia',
    name: 'Micronesia',
    continent: 'Australia',
    area: 702,
    population: 135000,
    populationDensity: 171,
  },
];

export const continents: Array<ContinentI> = [
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

export const cities: Array<CityI> = [
  {
    entity: 'city',
    id: 'cartagena',
    name: 'Cartagena',
    countryId: 'Colombia',
    area: 572,
    population: 914552,
    populationDensity: 1600,
    isCapital: false,
    latitude: 10.393228221548107,
    longitude: -75.48822820777838,
  },
  {
    entity: 'city',
    id: 'pattaya',
    name: 'Pattaya',
    countryId: 'Thailand',
    area: 53,
    population: 119532,
    populationDensity: 2.238,
    isCapital: false,
    latitude: 12.9239994863064,
    longitude: 100.88250331601975,
  },
  {
    entity: 'city',
    id: 'rio-de-janeiro',
    name: 'Rio de Janeiro',
    countryId: 'Brazil',
    area: 1260,
    population: 6498837,
    populationDensity: 5105,
    isCapital: false,
    latitude: -23.0569325025763,
    longitude: -43.28135207428946,
  },
  {
    entity: 'city',
    id: 'cabo-san-lucas',
    name: 'Cabo San Lucas',
    countryId: 'Mexico',
    area: 48,
    population: 202694,
    populationDensity: 94,
    isCapital: false,
    latitude: 22.890642531070633,
    longitude: -109.916428999456,
  },
  {
    entity: 'city',
    id: 'puerto-princesa',
    name: 'Puerto Princesa',
    countryId: 'Philippines',
    area: 60,
    population: 255116,
    populationDensity: 110,
    isCapital: false,
    latitude: 9.764073652280166,
    longitude: 118.74710820264717,
  },
  {
    entity: 'city',
    id: 'Veenendaal',
    name: 'Veenendaal',
    countryId: 'Netherlands',
    area: 20,
    population: 65589,
    populationDensity: 3370,
    isCapital: false,
    latitude: 52.02630003951686,
    longitude: 5.554436743047774,
  },
  {
    entity: 'city',
    id: 'maputo',
    name: 'Maputo',
    countryId: 'Mozambique',
    area: 34769,
    population: 1088449,
    populationDensity: 3100,
    isCapital: true,
    latitude: -25.968903935780062,
    longitude: 32.57315546155215,
  },
];
