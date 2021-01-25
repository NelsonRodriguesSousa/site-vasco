import { Component, OnInit } from '@angular/core';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private worksService: WorksService) { }

  works = [];

  ngOnInit(): void {

    this.getWorks();
  }

  getWorks = () =>
    this.worksService
      .getUnarchivedWorks()
      .subscribe(res => {
        

        res.forEach(element => {
          var doc = <any>element.payload.doc.data();

          if (doc.arquivado == false) {
            this.works.push({
              nome: doc.nome,
              imagemCapa: doc.imagemCapa,
              subtitulo: doc.subtitulo,
            });
          }

         
        });

       

      });

}
