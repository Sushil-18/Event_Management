package com.example.Event_Management.controllers;

import com.example.Event_Management.dto.LogInDTO;
import com.example.Event_Management.dto.SignUpDTO;
import com.example.Event_Management.dto.SignUpResponseDTO;
import com.example.Event_Management.servcies.AuthService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Data
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/signup")
    public ResponseEntity<SignUpResponseDTO> signup(@RequestBody SignUpDTO signUpDto){
        SignUpResponseDTO signUpResponse = authService.signup(signUpDto);
        return new ResponseEntity<>(signUpResponse, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public String login(@RequestBody LogInDTO logindto){
        return authService.login(logindto);
    }

}
