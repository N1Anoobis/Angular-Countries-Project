import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContinentsComponent } from './continents/continents.component';
import { ContinentService } from './continents/continents.service';
import { ContinentComponent } from './continent/continent.component';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { NavItemComponent } from './navigation/nav-item/nav-item.component';
import { CountriesComponent } from './countries/countries.component';
import { CitiesComponent } from './cities/cities.component';
import { EntityListItemComponent } from './shared/entity-list-item/entity-list-item.component';
import { CountryComponent } from './countries/country/country.component';
import { CityComponent } from './cities/city/city.component';

const appRoutes: Routes = [
  { path: 'continents', component: ContinentsComponent },
  { path: 'continent/:id', component: ContinentComponent },
  {
    path: 'countries',
    component: CountriesComponent,
    children: [{ path: ':id', component: CountryComponent }],
  },
  {
    path: 'cities',
    component: CitiesComponent,
    children: [{ path: ':id', component: CityComponent }],
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ContinentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
