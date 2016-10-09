import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { AppComponent }   from './app.component';
import { LoadProjectComponent }   from './start/loadproject.component';

 
const appRoutes: Routes = [
   { 
      path: '',
      component: LoadProjectComponent
   },
    {
        path: 'projects/:id',
        component: LoadProjectComponent
    }
];
 
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);