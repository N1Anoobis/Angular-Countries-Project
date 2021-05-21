import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContinentsComponent } from './continents/continents.component';
import { ContinentService } from './continents/continents.service';
import { ContinentComponent } from './continent/continent.component';

const appRoutes: Routes = [
  {path: 'continents', component: ContinentsComponent},
  {path: 'continent/:id',component: ContinentComponent},
  {path: '', redirectTo: "continents" , pathMatch: 'full' },

]

@NgModule({
  declarations: [
    AppComponent,
    ContinentsComponent,
    ContinentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ContinentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
