package com.example.Event_Management.controllers;

import com.example.Event_Management.dto.LogInDTO;
import com.example.Event_Management.dto.LoginResponse;
import com.example.Event_Management.dto.SignUpDTO;
import com.example.Event_Management.dto.SignUpResponseDTO;
import com.example.Event_Management.services.AuthService;
import com.example.Event_Management.servicesImp.UserDetailsServiceImp;
import com.example.Event_Management.util.JwtUtil;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@Data
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    private final AuthenticationManager authenticationManager;

    private final UserDetailsServiceImp userDetailsServiceImp;

    private final JwtUtil jwtUtil;
    @PostMapping("/signup")
    public ResponseEntity<SignUpResponseDTO> signup(@RequestBody SignUpDTO signUpDto){
        SignUpResponseDTO signUpResponse = authService.signup(signUpDto);
        return new ResponseEntity<>(signUpResponse, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LogInDTO logindto) throws Exception {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(logindto.getUsername(),logindto.getPassword()));
        }
        catch (Exception e){
            throw new Exception("Incorrect username or password",e);
        }

        final UserDetails userDetails = userDetailsServiceImp.loadUserByUsername(logindto.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new LoginResponse(jwt));
    }

    
}
