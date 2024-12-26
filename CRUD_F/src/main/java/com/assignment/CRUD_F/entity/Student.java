//SUSHMITHA KONDURU G01456225
//RAMYASRI BHATTARAM G01443966
//CHANDANA KONDA G01449289
//VAISHNAV SAI VIVEK VARMA YARAKARAJU G01464960

//Declaring the table name and columns of the database that will be used to store the survey data

package com.assignment.CRUD_F.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // Full Name
    private String streetAddress; // Street Address
    private String city; // City
    private String state; // State
    private Long zipcode; // Zip Code
    private Long phNumber; // Telephone Number
    private String mailAddress; // Email Address
    private String url; // URL
    private String dateOfInterest; // Date
    @ElementCollection
    @CollectionTable(name = "student_campus_preferences", joinColumns = @JoinColumn(name = "student_id"))
    @Column(name = "preference")
    private List<String> campusPreferences; // What did you like most about the campus?
    private String interestSource; // How did you become interested in the university?
    private String graduationMonth; // Graduation Month
    private String graduationYear; // Graduation Year
    private String recommendationLikelihood; // Likelihood of recommending the school
    private String additionalComments; // Additional comments
}
