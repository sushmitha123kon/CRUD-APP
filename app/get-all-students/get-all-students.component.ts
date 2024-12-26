//SUSHMITHA KONDURU G01456225
//RAMYASRI BHATTARAM G01443966
//CHANDANA KONDA G01449289
//VAISHNAV SAI VIVEK VARMA YARAKARAJU G01464960

//captures user input such as personal details, preferences, and feedback from the API.
import { Component,OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-get-all-students',
  templateUrl: './get-all-students.component.html',
  styleUrl: './get-all-students.component.css'
})
export class GetAllStudentsComponent implements OnInit{

  students: {
    id: number;
    name: string;
    streetAddress: string;
    city: string;
    state: string;
    zipcode: number;
    phNumber: string;
    mailAddress: string;
    url: string;
    campusPreferences: string[]; // List of campus preferences
    interestSource: string; // How did they become interested in the university?
    graduationMonth: string; // Graduation Month
    graduationYear: string; // Graduation Year
    recommendationLikelihood: string; // Likelihood of recommending the school
    additionalComments: string; // Additional comments from the student
  }[] = [];  
  
  constructor(private studentService:StudentService){

  }

  ngOnInit(){
    this.getALlStudents();
  }

  getALlStudents(){
    this.studentService.getAllStudent().subscribe((res)=>{
      console.log(res);
      this.students=res;
    })
  }

  deleteStudent(id:number){
    this.studentService.deleteStudent(id).subscribe((res)=>{
      console.log(res);
      this.getALlStudents();
    })
  }

}
