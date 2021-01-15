import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'; 
import { FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';




@Injectable({
  providedIn: 'root'
})
export class WorksService {

  constructor(private firestore: AngularFirestore) {   }

  form = new FormGroup({
    conteudo: new FormControl("", Validators.required),
    imagemCapa: new FormControl("", Validators.required),
    nome: new FormControl("", Validators.required),
    subtitulo: new FormControl("", Validators.required),
    titulo: new FormControl("", Validators.required),
  });

  getWorks() {
    return this.firestore.collection("trabalhos").snapshotChanges();
  }


  createWork(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("trabalhos")
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  editWork(data, id) {
    return this.firestore
      .collection("trabalhos")
      .doc(id)
      .set(data, { merge: true });
  }



  deleteWork(data) {
    return this.firestore
      .collection("trabalhos")
      .doc(data.payload.doc.id)
      .delete();
  }

}
