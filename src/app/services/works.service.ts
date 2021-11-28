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
    tipo: new FormControl("", Validators.required),
    arquivado: new FormControl(false),
    ordem: new FormControl(0, Validators.required) 
  });

  getUnarchivedWorks() {
    return this.firestore.collection('trabalhos', ref => ref.orderBy('ordem', 'asc')).snapshotChanges();
  }

  getAllWorks() {
    return this.firestore.collection('trabalhos', ref => ref.orderBy('ordem', 'asc')).snapshotChanges();
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
