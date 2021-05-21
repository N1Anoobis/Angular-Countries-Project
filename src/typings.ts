export interface ContinentDetailsI {
  id: string;
  name: string;
  area: number;
  population: number;
  populationDensity: number;
  minHeight: number;
  maxHeight: number;
  image?: string;
}

export interface ContinentI extends ContinentDetailsI {
  id: string;
  entity: string;
}

export interface ContinentFormData {
  entity: string;
  id: string;
  name: string;
  area: number | null;
  population: number | null;
  populationDensity: number | null;
  minHeight: number | null;
  maxHeight: number | null;
  image?: string;
}

export interface CountryUserDetailsI {
  id: string;
  name: string;
  capital?: string;
  area: number;
  population: number;
  populationDensity: number;
  image?: string;
}

export interface CountryI extends CountryUserDetailsI {
  id: string;
  continent: string;
  entity: string;
}

export interface CountryFormData {
  entity: string;
  id: string;
  name: string;
  continent: string;
  capital?: string;
  area: number | 0;
  population: number | 0;
  populationDensity: number | 0;
  image?: string;
}

export interface ContentI {
  entity: string;
  id: number;
  name: string;
  area: number;
  population: number;
  populationDensity: number;
  minHeight?: number;
  maxHeight?: number;
  continent?: string;
}

export interface CityUserDetailsI {
  id: string;
  name: string;
  area: number;
  population: number;
  populationDensity: number;
  isCapital: boolean;
  image?: string;
  longitude?: number;
  latitude?: number;
}

export interface CityDetailsI extends CityUserDetailsI {
  countryId: string;
}

export interface CityI extends CityDetailsI {
  id: string;
  entity: string;
}

export interface CityFormData {
  entity: string;
  id: string;
  name: string;
  countryId: string;
  area: number | null;
  population: number | null;
  populationDensity: number | null;
  isCapital: boolean;
  image?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
export interface ImportFileFormat {
  entity: 'continent' | 'country' | 'city';
  id: string;
  name: string;
  area: number;
  population: number;
  populationDensity: number;
  minHeight: number | null;
  maxHeight: number | null;
  continent: string | null;
  capital: string | null;
  countryId: string | null;
  isCapital: boolean | null;
  image?: string | null;
}
