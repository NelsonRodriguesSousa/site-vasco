import { Component, OnInit } from '@angular/core';
import { WorksService } from 'src/app/services/works.service';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { BioService } from 'src/app/services/bio.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public worksService: WorksService, public bioService: BioService, public firestore: AngularFirestore, public cookieService: CookieService) { }


  tipos = [];

  showSuccessMessage = false;

  isLogged = false;
  works = [];
  selectedWork: any = null;
  enBio: any;
  ptBio: any;
  pw: any;
  selectedId: any;

  ngOnInit(): void {

    if (this.cookieService.get('isLogged') != null && this.cookieService.get('isLogged') == 'yes') {
      this.isLogged = true;
    }

    this.getWorks();
    this.getBios();

    this.tipos = this.worksService.getTypes();

  }

  onTipoChanged(event) {

   console.log(event.target.value);

  }

  getWorks () {

    this.worksService
    .getAllWorks()
    .subscribe(
      res => {
        this.works = res;
      });
  }

  deleteWork = data => this.worksService.deleteWork(data);

  entrar() {
    if ((this.pw == 'vasco')) {
      this.isLogged = true;
      this.cookieService.set('isLogged', 'yes');

    } else {
      alert("senha errada!");
      this.pw = '';
    }
  }

  sair() {

    this.isLogged = false;
    this.cookieService.deleteAll();
    location.reload();

  }

  arquivar() {

    this.worksService.form.setValue({
      conteudo: this.selectedWork.conteudo,
      imagemCapa: this.selectedWork.imagemCapa,
      titulo: this.selectedWork.titulo,
      nome: this.selectedWork.nome,
      subtitulo: this.selectedWork.subtitulo,
      arquivado: !this.selectedWork.arquivado,
      ordem: this.selectedWork.ordem
    });

    this.onEdit();
    
  }

  getBios() {

    this.bioService
      .getBio('8gvNivwD4eKxhKtewRG1')
      .subscribe(res => {
        this.ptBio = res.data();
        this.bioService.ptBio.setValue({
          content: this.ptBio.content
        });
      });

    this.bioService
      .getBio('z0F3xdQAduL6YmfmyGIf')
      .subscribe(res => {
        this.enBio = res.data();
        this.bioService.enBio.setValue({
          content: this.enBio.content
        });
      });
  }

  onSubmit() {

    // arquivado false como default
    this.worksService.form.patchValue({ arquivado : false})

    let data = this.worksService.form.value;
    this.worksService.createWork(data).then(res => {
      
      this.showSuccessMsg();
      this.selectedWork = null;
      window.location.reload();
    });
  }

  onEdit() {
    let data = this.worksService.form.value;
    this.worksService.editWork(data, this.selectedId).then(res => {
      this.showSuccessMsg();
      this.selectedWork = null;
    });
  }

  onEditBio(id) {
    let data;

    if (id == '8gvNivwD4eKxhKtewRG1') {
      data = this.bioService.ptBio.value;
    } else {
      data = this.bioService.enBio.value;
    }

    this.bioService.editBio(data, id).then(res => {
      this.showSuccessMsg();
    });
  }

 

  closeEdition() {
    this.selectedWork = null;
    this.clearForm();
  }

  showSuccessMsg() {
    this.showSuccessMessage = true;

    setTimeout(() => {
      this.showSuccessMessage = false;

    }, 2000);

  }

  clearForm() {
    this.selectedWork = null;
    this.worksService.form.reset();
  }


  selectWork(nome) {

    this.firestore.collection('trabalhos', ref => ref.where("nome", "==", nome)).get()
      .subscribe(ss => {
        if (ss.docs.length === 0) {

        } else {
          ss.docs.forEach(doc => {
            this.selectedWork = <object>doc.data();
            this.selectedId = doc.id;

            this.worksService.form.setValue({
              conteudo: this.selectedWork.conteudo,
              imagemCapa: this.selectedWork.imagemCapa,
              titulo: this.selectedWork.titulo,
              nome: this.selectedWork.nome,
              subtitulo: this.selectedWork.subtitulo,
              arquivado: this.selectedWork.arquivado,
              ordem: this.selectedWork.ordem,
              tipo: this.selectedWork.tipo
            });
          })
        }
      })
  }
}