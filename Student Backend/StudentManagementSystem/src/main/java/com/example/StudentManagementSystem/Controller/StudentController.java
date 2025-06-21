package com.example.StudentManagementSystem.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.StudentManagementSystem.entity.student;
import com.example.StudentManagementSystem.serviceI.serviceInterface;

import jakarta.validation.Valid;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

	
	@Autowired
	private serviceInterface serv;
	
	@PostMapping("/students")
	public student post(@Valid @RequestBody student stud) {
		return serv.save(stud);
	}

	@GetMapping("/students")
	public List<student> getAll() {

		return serv.getAll();
	}

	@GetMapping("/students/{id}")
	public Optional<student> getById(@PathVariable("id") int id1) {
		return serv.getById(id1);
	}

	@PutMapping("/students/{id}")
	public student put(@PathVariable("id") student id1,@Valid @RequestBody student stud) {
		return serv.save(stud);
	}
	
	

	@DeleteMapping("/students/{id}")
	public void deleteById(@PathVariable("id") int id1) {
		serv.deleteById(id1);
		
	}

	@GetMapping("/search")
	public List<student> findByCourse(@RequestParam("course") String course1) {
		
		return serv.findByCourse(course1);
	}

	
	@GetMapping("/searchbyname")
	public List<student> findByName(@RequestParam("name") String name1) {
		// TODO Auto-generated method stub
		return serv.findByName(name1);
	}
	
}
