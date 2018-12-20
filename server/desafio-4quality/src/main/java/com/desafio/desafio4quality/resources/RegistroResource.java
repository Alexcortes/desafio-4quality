package com.desafio.desafio4quality.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.desafio.desafio4quality.models.Register;
import com.desafio.desafio4quality.repository.RegisterRepository;

@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class RegistroResource {

	@Autowired
	RegisterRepository registerRepository;

	@PostMapping("/register")
	public Register newRegister(@RequestBody Register register) {
		if(register.getLatitude() == null || register.getLongitude() == null ) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "As coordenadas não podem ser nulas");
		}
		if(register.getImage()==null || register.getImage().isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A imagem não pode ser nula");
		}
		try {
			return registerRepository.save(register);
		}catch(Exception ex){
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ocorreu um erro ao tentar salvar o registro", ex);
		}
		
	}

}