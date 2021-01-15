import { Component, OnInit } from '@angular/core';
import { BioService } from 'src/app/services/bio.service';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {

  constructor(private bioService : BioService) { }

  ptBio : any;
  enBio : any;

  ngOnInit(): void {

    this.getBios();
  }

  getBios() {
    this.bioService
    .getBio('8gvNivwD4eKxhKtewRG1')
    .subscribe(res => {
   
      this.ptBio = res.data();
      
    });

    this.bioService
    .getBio('z0F3xdQAduL6YmfmyGIf')
    .subscribe(res => {
      this.enBio = res.data();
    });
  }

}
