package com.example.StudentManagementSystem.entity;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@Entity
@Table(name="student")
public class student {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@NotBlank(message = "Name is required")
	private String name;
	@NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
	private String email;
	
	@NotBlank(message = "Course is required")
    private String course;

    @NotNull(message = "Enrollment date is required")
    private Date enrollmentDate;
}
