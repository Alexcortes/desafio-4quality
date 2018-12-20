package com.desafio.desafio4quality.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desafio.desafio4quality.models.Register;
import com.desafio.desafio4quality.repository.RegisterRepository;

@RestController
@RequestMapping(value = "/api")
public class RegistroResource {

	@Autowired
	RegisterRepository registerRepository;

	@PostMapping("/register")
	public Register newRegister(@RequestBody Register register) {
		return registerRepository.save(register);
	}

}
