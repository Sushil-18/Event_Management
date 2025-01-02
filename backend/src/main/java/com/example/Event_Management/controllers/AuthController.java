package com.example.Event_Management.controllers;

import com.example.Event_Management.dto.LogInDTO;
import com.example.Event_Management.dto.SignUpDTO;
import com.example.Event_Management.dto.SignUpResponseDTO;
import com.example.Event_Management.services.AuthService;
import com.example.Event_Management.servicesImp.UserDetailsServiceImp;
import com.example.Event_Management.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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
    public ResponseEntity<String> login(@RequestBody LogInDTO logindto , HttpServletResponse response) throws Exception {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(logindto.getUsername(),logindto.getPassword()));
        }
        catch (Exception e){
            throw new Exception("Incorrect username or password",e);
        }

        final UserDetails userDetails = userDetailsServiceImp.loadUserByUsername(logindto.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        Cookie cookie = new Cookie("token",jwt);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(60*60);
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.ok("Logged in successfully");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> Logout(HttpServletResponse response){
        try{
            Cookie cookie = new Cookie("token",null);
            cookie.setHttpOnly(true);
            cookie.setMaxAge(0);
            response.addCookie(cookie);

             return ResponseEntity.ok("Logged out Successfully");
        }
        catch (Exception e){
            throw new RuntimeException("Error while logging out",e);
        }
    }


    
}
