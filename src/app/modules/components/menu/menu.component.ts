import { Component, OnInit } from '@angular/core';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  tipos = [];

  constructor(private worksService: WorksService) { }

  ngOnInit(): void {
  
    this.tipos = this.worksService.getTypes().filter(tipo => tipo != 'home' && tipo != 'works');
    this.tipos.unshift('all');
  }

}
