//SUSHMITHA KONDURU G01456225
//RAMYASRI BHATTARAM G01443966
//CHANDANA KONDA G01449289
//VAISHNAV SAI VIVEK VARMA YARAKARAJU G01464960

//This Spring Boot StudentController handles HTTP requests for Student entities, providing endpoints to create, retrieve, update, and delete records via the StudentService

package com.assignment.CRUD_F.controller;

import com.assignment.CRUD_F.entity.Student;
import com.assignment.CRUD_F.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {

    private final StudentService studentService;

    // Create a new student
    @PostMapping("/student")
    public ResponseEntity<Student> postStudent(@RequestBody Student student) {
        Student createdStudent = studentService.postStudent(student);
        return ResponseEntity.ok(createdStudent);
    }

    // Get all students
    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudent();
        return ResponseEntity.ok(students);
    }

    // Get a student by ID
    @GetMapping("/student/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Student student = studentService.getStudentById(id);
        if (student == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(student);
    }

    // Update an existing student
    @PutMapping("/student/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        Student existingStudent = studentService.getStudentById(id);
        if (existingStudent == null) {
            return ResponseEntity.notFound().build();
        }

        // Update fields with new data
        existingStudent.setName(student.getName());
        existingStudent.setStreetAddress(student.getStreetAddress());
        existingStudent.setCity(student.getCity());
        existingStudent.setState(student.getState());
        existingStudent.setZipcode(student.getZipcode());
        existingStudent.setPhNumber(student.getPhNumber());
        existingStudent.setMailAddress(student.getMailAddress());
        existingStudent.setUrl(student.getUrl());
        existingStudent.setDateOfInterest(student.getDateOfInterest());
        existingStudent.setCampusPreferences(student.getCampusPreferences());
        existingStudent.setInterestSource(student.getInterestSource());
        existingStudent.setGraduationMonth(student.getGraduationMonth());
        existingStudent.setGraduationYear(student.getGraduationYear());
        existingStudent.setRecommendationLikelihood(student.getRecommendationLikelihood());
        existingStudent.setAdditionalComments(student.getAdditionalComments());

        Student updatedStudent = studentService.updateStudent(existingStudent);
        return ResponseEntity.ok(updatedStudent);
    }

    // Delete a student
    @DeleteMapping("/student/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        Student existingStudent = studentService.getStudentById(id);
        if (existingStudent == null) {
            return ResponseEntity.notFound().build();
        }
        studentService.deleteStudent(id);
        return ResponseEntity.ok().build();
    }
}
