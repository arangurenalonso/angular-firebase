import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Author } from '../../models/author';
import { ButtonAction } from 'src/app/models/buttonAction';

@Component({
  selector: 'app-table-author',
  templateUrl: './table-author.component.html',
  styleUrls: ['./table-author.component.scss']
})
export class TableAuthorComponent implements OnInit {

  @Input() authors:Author[]=[]; 
  @Input() buttons:ButtonAction[]=[]; 
  @Output()  onClickButton:EventEmitter<{author:Author,btnAction:number}>=new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  onClickButtonSelect(author:Author,btnAction:number){
    let rpta={
      author:author,
      btnAction:btnAction
    }
    this.onClickButton.emit(rpta)
  }
}
