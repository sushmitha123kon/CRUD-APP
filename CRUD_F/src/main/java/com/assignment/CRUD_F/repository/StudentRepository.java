//SUSHMITHA KONDURU G01456225
//RAMYASRI BHATTARAM G01443966
//CHANDANA KONDA G01449289
//VAISHNAV SAI VIVEK VARMA YARAKARAJU G01464960

//Provides data persistence

package com.assignment.CRUD_F.repository;

import com.assignment.CRUD_F.entity.Student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
@EnableJpaRepositories(basePackages = "com.assignment.CRUD_F.repository")


@Repository

public interface StudentRepository extends JpaRepository<Student, Long> {
}
