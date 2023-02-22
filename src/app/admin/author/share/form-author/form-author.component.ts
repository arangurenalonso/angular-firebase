import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Author } from '../../models/author';
import { ButtonAction } from 'src/app/models/buttonAction';
import { ACTION } from 'src/app/enum/btn-actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-author',
  templateUrl: './form-author.component.html',
  styleUrls: ['./form-author.component.scss']
})
export class FormAuthorComponent implements OnInit {
  action = ACTION;
  
  @Input() author: Author = new Author()  
  @Input() buttons:ButtonAction[]=[]; 
  @Output()  onClickButton:EventEmitter<{author:Author,btnAction:number,form:NgForm}>=new EventEmitter()
  constructor(
    
    ) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    let rpta={
      author:this.author,
      btnAction:this.author.id?ACTION.update:ACTION.add,
      form:form
    }
    this.onClickButton.emit(rpta)
  }

}
