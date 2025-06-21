package com.example.StudentManagementSystem.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.StudentManagementSystem.entity.student;

@Repository
public interface RepositoryInterface extends JpaRepository<student, Integer>{

	List<student> findByCourse(@Param("course") String course);
	
	@Query("SELECT s FROM student s WHERE s.name LIKE %:name%")
	List<student> findByName(@Param("name") String name);
}
