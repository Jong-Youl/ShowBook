package com.showbook.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/book")
public class TestController {


	@GetMapping()
	public ResponseEntity<String> test () {

		return ResponseEntity.ok("확인 요~");
	}
}
