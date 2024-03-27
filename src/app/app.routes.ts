import {Route} from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'register',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('src/app/toto/toto.routes').then((m) => m.totoRoutes),
  },
];
