package com.desafio.desafio4quality.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.desafio.desafio4quality.models.Register;


public interface RegisterRepository  extends JpaRepository<Register, Long>{
	

}
