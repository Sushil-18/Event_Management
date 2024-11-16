package com.example.Event_Management.repository;

import com.example.Event_Management.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
