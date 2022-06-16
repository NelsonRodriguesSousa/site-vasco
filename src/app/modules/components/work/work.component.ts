import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  constructor(private worksService: WorksService, private activatedRoute: ActivatedRoute,) { }

  works = [];

  ngOnInit(): void {

    console.log("entrou aqui");


    var nome = this.activatedRoute.snapshot.paramMap.get('name');

    this.getWorks(nome);


    // receber o que vem no url
   

  }

  getWorks = (type) =>
    this.worksService
      .getUnarchivedWorks(type)
      .subscribe(res => {

        res.forEach(element => {
          var doc = <any>element.payload.doc.data();

            this.works.push({
              nome: doc.nome,
              titulo: doc.titulo,
              imagemCapa: doc.imagemCapa,
              subtitulo: doc.subtitulo,
            });
          
        });  

      });

}
