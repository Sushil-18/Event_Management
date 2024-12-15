package com.example.Event_Management.repository;

import com.example.Event_Management.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String username);

    Boolean existsByEmail(String username);

}
