import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayerComponent } from './components/player/player.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/player',
    pathMatch: 'full'
  },
  {path:'home', component: HomeComponent},
  {path:'player', component: PlayerComponent}

  // { path: 'monsters', component: MonsterComponent},
  // { path: 'players', component: PlayerComponent}
];
export const routing = RouterModule.forRoot(routes);
