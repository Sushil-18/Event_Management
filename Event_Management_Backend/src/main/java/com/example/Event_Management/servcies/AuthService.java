package com.example.Event_Management.servcies;

import com.example.Event_Management.dto.LogInDTO;
import com.example.Event_Management.dto.SignUpDTO;

public interface AuthService {
    String signup(SignUpDTO signupdto);

    String login(LogInDTO logindto);
}
