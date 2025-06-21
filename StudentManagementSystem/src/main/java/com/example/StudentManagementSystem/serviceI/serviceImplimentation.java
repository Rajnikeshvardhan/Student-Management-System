package com.example.StudentManagementSystem.serviceI;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.StudentManagementSystem.Repository.RepositoryInterface;
import com.example.StudentManagementSystem.entity.student;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class serviceImplimentation implements serviceInterface {

	@Autowired
	private RepositoryInterface repo;
	
	
	
	@Override
	public List<student> getAll() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public Optional<student> getById(int id) {
		// TODO Auto-generated method stub
		return repo.findById(id);
	}

	@Override
	public student save(student stud) {
		// TODO Auto-generated method stub
		return repo.save(stud);
	}

	@Override
	public void deleteById(int id) {
		// TODO Auto-generated method stub
		repo.deleteById(id);
		
	}

	@Override
	public List<student> findByCourse(String course) {
		// TODO Auto-generated method stub
		return repo.findByCourse(course);
	}

	@Override
	public List<student> findByName(String name) {
		// TODO Auto-generated method stub
		return repo.findByName(name);
	}
}
