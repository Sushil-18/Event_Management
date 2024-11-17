package com.example.Event_Management.servicesImp;

import com.example.Event_Management.dto.LogInDTO;
import com.example.Event_Management.dto.SignUpDTO;
import com.example.Event_Management.entities.User;
import com.example.Event_Management.repository.UserRepository;
import com.example.Event_Management.servcies.AuthService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImp implements AuthService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder bCryptPasswordEncoder;
    @Override
    public String signup(SignUpDTO signupdto) {
        User user = modelMapper.map(signupdto,User.class);
        user.setPassword(bCryptPasswordEncoder.encode(signupdto.getPassword()));
        userRepository.save(user);
        return "Signed Up Successfully";
    }

    @Override
    public String login(LogInDTO logindto) {
        return "Logged in";
    }
}
