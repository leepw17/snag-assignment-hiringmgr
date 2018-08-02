import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// Componenets
import { AppComponent } from './app.component';
import { FormComponent } from './components/questions/form/form.component';
import { ActivequestionsComponent } from './components/questions/activequestions/activequestions.component';
import { ApplicationComponent } from './components/applications/application/application.component';
import { AcceptedListComponent } from './components/applications/accepted-list/accepted-list.component';
import { RejectedListComponent } from './components/applications/rejected-list/rejected-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// services
import { QuestionService } from './services/question/question.service';
import { ApplicationService } from './services/application/application.service';
import { HomeComponent } from './components/home/home.component';
import { HiringComponent } from './components/hiring/hiring.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hiring', component: HiringComponent },
  { path: 'questions/form', component: FormComponent },
  { path: 'questions/form/:id', component: FormComponent },
  { path: 'applications/application', component: ApplicationComponent },
  { path: 'applications/application/:id', component: ApplicationComponent },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
]

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NotFoundComponent,
    ActivequestionsComponent,
    ApplicationComponent,
    AcceptedListComponent,
    RejectedListComponent,
    HomeComponent,
    HiringComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [QuestionService, ApplicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
