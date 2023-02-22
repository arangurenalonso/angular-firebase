import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Author } from '../../models/author';
import { ACTION } from 'src/app/enum/btn-actions';
import { ButtonAction } from 'src/app/models/buttonAction';
import { log } from 'console';
import { AuthorService } from '../../services/author.service';
import Swal from 'sweetalert2';
import { FormAuthorComponent } from '../../share/form-author/form-author.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,OnDestroy {

  authors: Author[] = [];
  author: Author = new Author()
  buttonsTable: ButtonAction[] = [
    { name: "Editar", action: ACTION.update, class: "btn btn-sm btn-success" },
    { name: "Eliminar", action: ACTION.delete, class: "btn btn-sm btn-danger" },
  ]

  @ViewChild(FormAuthorComponent) formAuthorComponent!: FormAuthorComponent;
  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.getAuthor()
  }

  ngOnDestroy() {
  }
  getAuthor() {
    console.log("child",this.formAuthorComponent);
    this.authorService.getAll().subscribe(
      authors => {
        this.authors = authors
      }
    )
  }
  onClickTableButton(event: { author: Author, btnAction: number }) {
    switch (event.btnAction) {
      case ACTION.update:
        this.actionUpdateFromTable(event.author)
        break;
      case ACTION.delete:
        this.actionDeleteFromTable(event.author)
        break;
      default:
        console.log(event);
    }
  }
  actionUpdateFromTable(author: Author) {
    this.author = author
  }
  async actionDeleteFromTable(author: Author) {
    const response = await this.authorService.delete(author).then(x => {
      this.operacionExitosa()
    }).catch(err=>{
      this.operacionFallida()
    })

  }
  onClickFormButton(event: { author: Author, btnAction: number,form:NgForm }) {
    switch (event.btnAction) {
      case ACTION.add:
        this.actionCreateFromForm(event.author,event.form)
        break;
      case ACTION.update:
        this.actionUpdateFromForm(event.author,event.form)
        break;
      default:
        console.log(event);
    }
  } 
  async actionCreateFromForm(author: Author,form:NgForm) {
    const response = await this.authorService.registrar(author).then(x => {
      this.operacionExitosa()
      this.limpiar()
      form.resetForm(); 
    }).catch(err=>{
      this.operacionFallida()
    })

  }
  async actionUpdateFromForm(author: Author,form:NgForm) {
    const response = await this.authorService.actualizar(author).then(x => {
      form.resetForm(); 
      this.operacionExitosa()
      this.limpiar()
    }).catch(err=>{
      this.operacionFallida()
    })
  }

  
  limpiar() {
    this.author = new Author()
  }
  operacionExitosa(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: "Operación Exitosa",
      showConfirmButton: false,
      timer: 1500
    })
  }
  operacionFallida(){
    Swal.fire({
      position: 'center',
      title: "Operación Fallida",
      icon: 'error',
      showConfirmButton: false,
      timer: 2500
    })    
  }

}
