import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BioComponent } from './modules/components/bio/bio.component';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';
import { HomeComponent } from './modules/components/home/home.component';
import { WorkDetailComponent } from './modules/components/work-detail/work-detail.component';
import { WorkComponent } from './modules/components/work/work.component';


const routes: Routes = [

  {path: 'work' , component: WorkComponent},
  {path: 'about', component: BioComponent},
  {path: 'work/:name', component: WorkDetailComponent},
  {path: 'admin', component: DashboardComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
