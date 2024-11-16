package com.example.Event_Management.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LogInDTO {
    @Email
    private String email;
    @Min(value = 8, message = "The password length should be minimum 8 characters")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", message = "The password must be of specified pattern")
    private String password;
}
