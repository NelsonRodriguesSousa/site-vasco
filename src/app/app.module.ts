import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './modules/components/menu/menu.component';
import { BioComponent } from './modules/components/bio/bio.component';
import { WorkDetailComponent } from './modules/components/work-detail/work-detail.component';
import { HomeComponent } from './modules/components/home/home.component';
import { FooterComponent } from './modules/components/footer/footer.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { WorkComponent } from './modules/components/work/work.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BioComponent,
    WorkDetailComponent,
    HomeComponent,
    FooterComponent,
    DashboardComponent,
    WorkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp (environment.firebaseConfig), 
    AngularFireModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
