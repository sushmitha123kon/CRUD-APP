//SUSHMITHA KONDURU G01456225
//RAMYASRI BHATTARAM G01443966
//CHANDANA KONDA G01449289
//VAISHNAV SAI VIVEK VARMA YARAKARAJU G01464960

//Consists of all the API end points to perfrom the CRUD operations

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

const URL=["http://localhost:8080"];

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  postStudent(student:any): Observable<any>{
    return this.http.post(URL+"/api/student",student);
  }
  getAllStudent():Observable<any>{
    return this.http.get(URL+"/api/students");
  }

  getStudentById(id: number):Observable<any>{
    return this.http.get(URL+"/api/student/"+ id);
  }

  updateStudent(id: number,student:any):Observable<any>{
    return this.http.put(URL+"/api/student/"+ id,student);
  }

  deleteStudent(id: number):Observable<any>{
    return this.http.delete(URL+"/api/student/"+ id);
  }




}
