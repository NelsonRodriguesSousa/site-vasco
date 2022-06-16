import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  tipos = [];

  showSecondMenu: boolean;

  constructor(private worksService: WorksService,  private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  
    this.tipos = this.worksService.getTypes().filter(tipo => tipo != 'home' && tipo != 'work');
    this.tipos.unshift('all');

      let array = window.location.href.split("/");

      console.log(array[array.length-1]);

      let currentRoute = array[array.length-1]


      this.showSecondMenu = !(currentRoute == 'home' || currentRoute == 'about' || currentRoute == '')

  

  }

}
