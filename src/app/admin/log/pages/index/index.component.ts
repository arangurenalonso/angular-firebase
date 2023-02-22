import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/admin/author/services/author.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private authorService: AuthorService) { } 
  logInformation:string[]=[]
  
  ngOnInit(): void {
    this.logOperation()
  }
  logOperation(){    
    this.authorService.getOperaciones().subscribe((logInformation) => {
      this.logInformation=logInformation
      
    });
  }
}
