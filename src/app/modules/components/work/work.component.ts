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

  type: any = "";

  indexesSegundaLinha = [1,5,9,13,17,21,25];
  indexesTerceiraLinha = [2,6,10,14,18,22,27];
  indexesQuartaLinha = [3,7,11,15,19,23,27];

  ngOnInit(): void {

    this.type = this.activatedRoute.snapshot.paramMap.get('name');;

    this.getWorks(this.type);

    /*
    this.works = [
      { nome: "FEBRE POSTAL", titulo: "POSTAL FEVER", imagemCapa: "https://imgur.com/dBBiP8T.jpg", subtitulo: "DOC. Portugal. 2023", titulo_en: "Febre Postal" },
      { nome: "ARMOUR", titulo: "ARMOUR", imagemCapa: "https://imgur.com/atAoCVo.jpg", subtitulo: "FIC. Portugal. 2023", titulo_en: "Desarme" },
      { nome: "Poente", titulo: "EVENTIDE", imagemCapa: "https://imgur.com/y70JZ1M.jpg", subtitulo: "FIC. Portugal. 2021", titulo_en: "Poente" },
      { nome: "Auspício", titulo: "AUSPICE", imagemCapa: "https://i.imgur.com/VOiu56R.jpg", subtitulo: "FIC. Portugal/ Brasil. 2019", titulo_en: "Auspício" },

      { nome: "ARMOUR", titulo: "ARMOUR", imagemCapa: "https://imgur.com/atAoCVo.jpg", subtitulo: "FIC. Portugal. 2023", titulo_en: "Desarme" },
      { nome: "Auspício", titulo: "AUSPICE", imagemCapa: "https://i.imgur.com/VOiu56R.jpg", subtitulo: "FIC. Portugal/ Brasil. 2019", titulo_en: "Auspício" },
      { nome: "FEBRE POSTAL", titulo: "POSTAL FEVER", imagemCapa: "https://imgur.com/dBBiP8T.jpg", subtitulo: "DOC. Portugal. 2023", titulo_en: "Febre Postal" },
      { nome: "Poente", titulo: "EVENTIDE", imagemCapa: "https://imgur.com/y70JZ1M.jpg", subtitulo: "FIC. Portugal. 2021", titulo_en: "Poente" },
    ]
    */
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
              titulo_en : doc.titulo_en
            });        
        });

      });

}
