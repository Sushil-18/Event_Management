package com.example.Event_Management.controllers;

import com.example.Event_Management.dto.LogInDTO;
import com.example.Event_Management.dto.SignUpDTO;
import com.example.Event_Management.servcies.AuthService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@Data
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/signup")
    public String signup(@RequestBody SignUpDTO signupdto){
        return authService.signup(signupdto);
    }

    @PostMapping("/login")
    public String login(@RequestBody LogInDTO logindto){
        return authService.login(logindto);
    }

}
