import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorRoutingModule } from './author-routing.module';
import { FormAuthorComponent } from './share/form-author/form-author.component';
import { MainComponent } from './pages/main/main.component';
import { TableAuthorComponent } from './share/table-author/table-author.component';


@NgModule({
  declarations: [ 
    TableAuthorComponent,
    FormAuthorComponent,
    MainComponent,
  ],
  imports: [ 
    FormsModule,
    CommonModule,    
    FormsModule,
    AuthorRoutingModule,
  ]
})
export class AuthorModule { }
