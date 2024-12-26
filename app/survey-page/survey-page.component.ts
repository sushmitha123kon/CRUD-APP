//SUSHMITHA KONDURU G01456225
//RAMYASRI BHATTARAM G01443966
//CHANDANA KONDA G01449289
//VAISHNAV SAI VIVEK VARMA YARAKARAJU G01464960

//captures user input such as personal details, preferences, and feedback. It processes the form data, formats selected preferences, and submits it to a student service

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { StudentService } from '../student.service';
import { ReactiveFormsModule } from '@angular/forms';
import { GetAllStudentsComponent } from '../get-all-students/get-all-students.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.css']
})
export class SurveyPageComponent implements OnInit {

  surveyPageForm!: FormGroup;
  likesDataList = [
    { label: 'Students', isChecked: false },
    { label: 'Location', isChecked: false },
    { label: 'Campus', isChecked: false },
    { label: 'Atmosphere', isChecked: false },
    { label: 'Dorm Rooms', isChecked: false },
    { label: 'Sports', isChecked: false }
  ];
  constructor(private studentService: StudentService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.surveyPageForm = this.fb.group({
      name: [null, [Validators.required]], // Full Name
      streetAddress: [null], // Street Address
      city: [null], // City
      state: [null], // State
      zipcode: [null, [Validators.pattern(/^\d{5}(-\d{4})?$/)]], // Zip Code (5 or 9 digit format)
      phNumber: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]], // Telephone Number (10 digits)
      mailAddress: [null, [Validators.required, Validators.email]], // Email
      url: [null, [Validators.required, Validators.required]], // URL
      campusPreferences: this.fb.array(this.likesDataList.map(() => this.fb.control(false))), // List of campus preferences (array of strings)
      interestSource: [null, [Validators.required]], // How did you become interested in the university?
      graduationMonth: [null, [Validators.required]], // Graduation Month
      graduationYear: [null, [Validators.required]], // Graduation Year
      recommendationLikelihood: [null, [Validators.required]], // Likelihood of recommending the school
      additionalComments: [null], // Additional comments
      dateOfInterest: [null, [Validators.required]] // Added Date of Interest
    });
  }

  get campusPreferences() {
    return this.surveyPageForm.get('campusPreferences') as FormArray;
  }
  

  postStudent() {
    const selectedPreferences = this.likesDataList
      .filter((_, i) => this.campusPreferences.at(i).value) // Filter selected checkboxes
      .map(preference => preference.label);

    // Add the selected preferences to the form value
    const formData = {
      ...this.surveyPageForm.value,
      campusPreferences: selectedPreferences
    };
    // Submit the form data
    this.studentService.postStudent(formData).subscribe((res) => {
      console.log('Response:', res);
      this.router.navigateByUrl('get-all-students');
    });
  }
}
