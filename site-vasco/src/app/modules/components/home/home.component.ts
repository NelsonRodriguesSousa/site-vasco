import { Component, OnInit } from '@angular/core';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private worksService : WorksService) { }

  works = [];

  ngOnInit(): void {

    this.getWorks();
  }

  getWorks = () =>
    this.worksService
      .getWorks()
      .subscribe(res => (this.works = res));

}
