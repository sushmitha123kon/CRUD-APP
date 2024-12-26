//SUSHMITHA KONDURU G01456225
//RAMYASRI BHATTARAM G01443966
//CHANDANA KONDA G01449289
//VAISHNAV SAI VIVEK VARMA YARAKARAJU G01464960

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  id!: number;
  updateStudentForm!: FormGroup;
  likesDataList = [
    { label: 'Students', isChecked: false },
    { label: 'Location', isChecked: false },
    { label: 'Campus', isChecked: false },
    { label: 'Atmosphere', isChecked: false },
    { label: 'Dorm Rooms', isChecked: false },
    { label: 'Sports', isChecked: false }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: StudentService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateStudentForm = this.fb.group({
      name: [null, [Validators.required]],
      streetAddress: [null],
      city: [null],
      state: [null],
      zipcode: [null, [Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      phNumber: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      mailAddress: [null, [Validators.required, Validators.email]],
      url: [null, [Validators.required]],
      campusPreferences: this.fb.array([]), // Initialize as a FormArray
      interestSource: [null, [Validators.required]],
      graduationMonth: [null, [Validators.required]],
      graduationYear: [null, [Validators.required]],
      recommendationLikelihood: [null, [Validators.required]],
      additionalComments: [null],
      dateOfInterest: [null, [Validators.required]]
    });

    this.id = this.activatedRoute.snapshot.params['id'];
    this.getStudentById();
    this.initializePreferences();
  }

  initializePreferences() {
    // Populate the `campusPreferences` FormArray
    const formArray = this.updateStudentForm.get('campusPreferences') as FormArray;
    this.likesDataList.forEach(() => {
      formArray.push(this.fb.control(false)); // Add a control for each checkbox
    });
  }

  getStudentById() {
    this.service.getStudentById(this.id).subscribe((res) => {
      console.log(res);
      this.updateStudentForm.patchValue(res);

      // Set checkbox values based on the data from the server
      const formArray = this.updateStudentForm.get('campusPreferences') as FormArray;
      const preferences = res.campusPreferences || []; // Server's preferences array
      this.likesDataList.forEach((item, index) => {
        formArray.at(index).setValue(preferences.includes(item.label));
      });
    });
  }

  updateStudent() {
    // Collect the selected preferences before submitting
    const selectedPreferences = this.likesDataList
      .filter((_, index) => (this.updateStudentForm.get('campusPreferences') as FormArray).at(index).value)
      .map(item => item.label);

    const updatedData = {
      ...this.updateStudentForm.value,
      campusPreferences: selectedPreferences // Replace FormArray with a list of selected preferences
    };

    this.service.updateStudent(this.id, updatedData).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.router.navigateByUrl('get-all-students');
      }
    });
  }
}
