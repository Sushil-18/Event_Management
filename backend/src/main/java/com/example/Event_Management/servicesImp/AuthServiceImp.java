package com.example.Event_Management.servicesImp;

import com.example.Event_Management.dto.LogInDTO;
import com.example.Event_Management.dto.SignUpDTO;
import com.example.Event_Management.dto.SignUpResponseDTO;
import com.example.Event_Management.entities.User;
import com.example.Event_Management.excpetions.UserAlreadyExistsException;
import com.example.Event_Management.excpetions.UserRegistrationException;
import com.example.Event_Management.repository.UserRepository;
import com.example.Event_Management.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImp implements AuthService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public SignUpResponseDTO signup(SignUpDTO signupdto) {
        if(userRepository.existsByEmail(signupdto.getEmail())){
            throw new UserAlreadyExistsException("Email is already registered.");
        }
        try{
            User user = modelMapper.map(signupdto,User.class);
            user.setPassword(passwordEncoder.encode(signupdto.getPassword()));
            userRepository.save(user);

            return modelMapper.map(user,SignUpResponseDTO.class);
        }
        catch (Exception e){
            throw new UserRegistrationException("Registration Failed!",e);
        }

    }

    @Override
    public String login(LogInDTO logindto) {
        return "Logged in";
    }
}
