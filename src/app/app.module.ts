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
import { HttpClientModule } from '@angular/common/http';
import { CountryFormComponent } from './countries/country-form/country-form.component';
import { RouterOutletComponent } from './shared/router-outlet/router-outlet.component';

const appRoutes: Routes = [
  { path: 'continents', component: ContinentsComponent },
  { path: 'continent/:id', component: ContinentComponent },
  {
    path: 'countries',
    component: RouterOutletComponent,
    children: [
      { path: '', component: CountriesComponent },
      { path: 'create', component: CountryFormComponent },
      { path: ':id', component: CountryComponent },
    ],
  },
  {
    path: 'cities',
    component: RouterOutletComponent,
    children: [
      { path: '', component: CitiesComponent },
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [ContinentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
