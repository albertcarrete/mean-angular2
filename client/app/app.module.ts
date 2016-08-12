// Required Angular Packages
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// Required Components
import { AppComponent } from './components/app/app.component';
import { routing } from './app.routes';
// Custom Components
import { HomeComponent } from './components/home/home.component';
import { PlayerComponent } from './components/player/player.component';
// test to module

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PlayerComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule{}
