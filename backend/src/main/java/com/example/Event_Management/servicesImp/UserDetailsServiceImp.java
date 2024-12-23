package com.example.Event_Management.servicesImp;

import com.example.Event_Management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImp implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.example.Event_Management.entities.User user = userRepository.findByEmail(username);

       if(user != null){
           return User.builder()
                   .username(user.getUsername())
                   .password(user.getPassword())
                   .build();
       }

       throw  new UsernameNotFoundException("User with username "+username+" does not exists");

    }
}
