import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'races',
    pathMatch: 'full',
  },
  {
    path: 'races',
    loadComponent: () =>
      import('./races/race-list/race-list').then(
        (component) => component.RaceList,
      ),
    title: 'Trail Races',
  },
];
