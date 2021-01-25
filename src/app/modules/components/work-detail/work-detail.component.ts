import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WorksService } from 'src/app/services/works.service';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';



@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.scss']
})
export class WorkDetailComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }


  work
  ngOnInit(): void {


    var nome = this.activatedRoute.snapshot.paramMap.get('name');


    this.firestore.collection('trabalhos', ref => ref.where("nome", "==", nome)).get()
    .subscribe(ss => {
      if (ss.docs.length === 0) {
       
      } else {
        ss.docs.forEach(doc => {
          this.work = <object>doc.data();

          this.work.conteudo = this.sanitizer.bypassSecurityTrustHtml(this.work.conteudo);


          
          console.log(this.work.conteudo);
    
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
