import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WorksService } from 'src/app/services/works.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.scss']
})
export class WorkDetailComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private activatedRoute: ActivatedRoute) { }

  conteudo = '<div class=\"texto\">cenas</div>'

  work
  ngOnInit(): void {


    var nome = this.activatedRoute.snapshot.paramMap.get('name');


    this.firestore.collection('trabalhos', ref => ref.where("nome", "==", nome)).get()
    .subscribe(ss => {
      if (ss.docs.length === 0) {
       
      } else {
        ss.docs.forEach(doc => {
          this.work = <object>doc.data();

          //var conteudo = new DOMParser().parseFromString(this.work.conteudo, "text/xml").firstChild;
                    
          this.work.conteudo = <string>this.work.conteudo;

          this.conteudo = this.work.conteudo.toString();
          
          console.log(doc.data());
    
        })
      }
    })
  
  }

stringToHTML(str) {
	var dom = document.createElement('div');
	dom.innerHTML = str;
	return dom;
};

}
