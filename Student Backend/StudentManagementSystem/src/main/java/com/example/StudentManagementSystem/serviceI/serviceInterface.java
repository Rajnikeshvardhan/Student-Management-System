package com.example.StudentManagementSystem.serviceI;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.query.Param;

import com.example.StudentManagementSystem.entity.student;

public interface serviceInterface {

	
	public List<student> getAll();
	public Optional<student> getById(int id);
	public student save(student stud);
	public void deleteById(int id);
	List<student> findByCourse(@Param("course") String course);
	List<student> findByName(@Param("name") String name);
	
}
