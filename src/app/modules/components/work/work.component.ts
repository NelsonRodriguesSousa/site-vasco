import { Component, OnInit } from '@angular/core';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

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

          if (doc.arquivado == false && doc.tipo == "works") {
            this.works.push({
              nome: doc.nome,
              titulo: doc.titulo,
              imagemCapa: doc.imagemCapa,
              subtitulo: doc.subtitulo,
            });
          }
        });  

      });

}
