//SUSHMITHA KONDURU G01456225
//RAMYASRI BHATTARAM G01443966
//CHANDANA KONDA G01449289
//VAISHNAV SAI VIVEK VARMA YARAKARAJU G01464960

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router'
import { StudentService } from './student.service';
import {ReactiveFormsModule,FormsModule,FormGroup} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SurveyPageComponent } from './survey-page/survey-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GetAllStudentsComponent } from './get-all-students/get-all-students.component';
import { UpdateStudentComponent } from './update-student/update-student.component';

const appRoutes: Routes = [
  {
    path: 'survey-page',
    component: SurveyPageComponent
  }, { path: '', component: WelcomePageComponent },{ path: 'get-all-students', component: GetAllStudentsComponent },{ path: 'student/:id', component: UpdateStudentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,SurveyPageComponent, GetAllStudentsComponent, UpdateStudentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    ReactiveFormsModule,FormsModule,HttpClientModule

  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
