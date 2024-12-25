package com.example.Event_Management.services;

import com.example.Event_Management.dto.LogInDTO;
import com.example.Event_Management.dto.SignUpDTO;
import com.example.Event_Management.dto.SignUpResponseDTO;

public interface AuthService {
    SignUpResponseDTO signup(SignUpDTO signupdto);

    String login(LogInDTO logindto);
}
