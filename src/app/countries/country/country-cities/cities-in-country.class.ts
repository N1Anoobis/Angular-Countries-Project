import { CityI } from 'src/typings';

export default class CitiesInCountryStateUpdate {
  static getCitiesStateUpdateData(
    cities: CityI[],
    currentPage: number,
    itemsPerPage: number
  ): { citiesPage: CityI[]; pagesCount: number } {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const citiesSlice = cities.slice(startIndex, endIndex);
    const pagesCount = Math.ceil(cities.length / itemsPerPage);

    return { citiesPage: citiesSlice, pagesCount };
  }
}
