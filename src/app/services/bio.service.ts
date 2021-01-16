import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BioService {

  constructor(private firestore : AngularFirestore) { }

  enBio = new FormGroup({
    content: new FormControl(""),
  });

  ptBio = new FormGroup({
    content: new FormControl(""),
  });


  editBio(data, id) {
    return this.firestore
      .collection("biografias")
      .doc(id)
      .set(data, { merge: true });
  }

  getBio(id) {
    return this.firestore
      .collection("biografias")
      .doc(id)
      .get();
  }

}
