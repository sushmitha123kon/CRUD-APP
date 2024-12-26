//SUSHMITHA KONDURU G01456225
//RAMYASRI BHATTARAM G01443966
//CHANDANA KONDA G01449289
//VAISHNAV SAI VIVEK VARMA YARAKARAJU G01464960
//This Spring Boot service, StudentService, provides CRUD operations for Student entities, including creating, retrieving, updating, and deleting records in a database. It interacts with the StudentRepository for data persistence and validates operations like checking if a student exists before updating or deleting.

package com.assignment.CRUD_F.service;

import com.assignment.CRUD_F.entity.Student;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.assignment.CRUD_F.repository.StudentRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Service
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class StudentService {

    private final StudentRepository studentRepository;

    // Create or Save a new Student
    public Student postStudent(Student student) {
        // Perform any necessary validation or transformation of the student data here
        return studentRepository.save(student);
    }

    // Get all Students
    public List<Student> getAllStudent() {
        return studentRepository.findAll();
    }

    // Get a Student by ID
    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    // Update an existing Student
    public Student updateStudent(Student student) {
        // Validate the student exists before updating
        if (studentRepository.existsById(student.getId())) {
            return studentRepository.save(student);
        } else {
            throw new IllegalArgumentException("Student with ID " + student.getId() + " does not exist.");
        }
    }

    // Delete a Student by ID
    public void deleteStudent(Long id) {
        // Check if the student exists before deletion
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Student with ID " + id + " does not exist.");
        }
    }
}
