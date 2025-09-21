import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'invest',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/invest/invest.component').then(
                (m) => m.InvestComponent
              ),
          },
        ],
      },
      {
        path: 'discover',
        loadComponent: () =>
          import('./pages/discover/discover.component').then(
            (m) => m.DiscoverComponent
          ),
      },
      { path: '', redirectTo: 'invest', pathMatch: 'full' },
    ],
  },
];
