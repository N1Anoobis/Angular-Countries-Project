import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContinentsComponent } from './continents/continents.component';
import { ContinentService } from './services/continents.service';
import { ContinentComponent } from './continents/continent/continent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { NavItemComponent } from './navigation/nav-item/nav-item.component';
import { CountriesComponent } from './countries/countries.component';
import { CitiesComponent } from './cities/cities.component';
import { EntityListItemComponent } from './shared/entity-list-item/entity-list-item.component';
import { CountryComponent } from './countries/country/country.component';
import { CityComponent } from './cities/city/city.component';
import { HttpClientModule } from '@angular/common/http';
import { CountryFormComponent } from './countries/country-form/country-form.component';
import { RouterOutletComponent } from './shared/router-outlet/router-outlet.component';
import { CreateContinentComponent } from './create-continent/create-continent.component';
import { InputComponent } from './shared/form/input/input.component';
import { FilterPipe } from './filter.pipe';
import { MapComponent } from './map/map.component';
import { MapFilterComponent } from './map-filter/map-filter.component';
import { PopulationPipe } from './shared/population.pipe';
import { DropdownComponent } from './shared/form/dropdown/dropdown.component';
import { CityFormComponent } from './city-form/city-form.component';

const appRoutes: Routes = [
  { path: 'continents', component: ContinentsComponent },
  { path: 'continent/:id', component: ContinentComponent },
  { path: 'edit/continent/:id', component: CreateContinentComponent },
  { path: 'create/continent', component: CreateContinentComponent },
  {
    path: 'countries',
    component: RouterOutletComponent,
    children: [
      { path: '', component: CountriesComponent },
      { path: 'create', component: CountryFormComponent },
      { path: 'edit/:id', component: CountryFormComponent },
      { path: ':id', component: CountryComponent },
    ],
  },
  {
    path: 'cities',
    component: RouterOutletComponent,
    children: [
      { path: '', component: CitiesComponent },
      { path: 'create', component: CityFormComponent },
      { path: 'edit/:id', component: CityFormComponent },
      { path: ':id', component: CityComponent },
    ],
  },
  { path: '', redirectTo: 'continents', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ContinentsComponent,
    ContinentComponent,
    NavigationComponent,
    NavItemComponent,
    CountriesComponent,
    CitiesComponent,
    EntityListItemComponent,
    CountryComponent,
    CityComponent,
    CountryFormComponent,
    RouterOutletComponent,
    CreateContinentComponent,
    InputComponent,
    FilterPipe,
    MapComponent,
    MapFilterComponent,
    PopulationPipe,
    DropdownComponent,
    CityFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [ContinentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
