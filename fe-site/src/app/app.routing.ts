import { Routes, RouterModule } from '@angular/router';

import { PageComponent } from './page/page.component';


const appRoutes: Routes = [
  { path: 'login', component: PageComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
