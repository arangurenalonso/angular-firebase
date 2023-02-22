import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent, 
    children: [
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m=>m.AuthorModule)
      },
      {
        path: 'log',
        loadChildren: () => import('./log/log.module').then(m=>m.LogModule)
      },
      { path: '**', redirectTo: 'author' }
    ]
  },
]

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }
