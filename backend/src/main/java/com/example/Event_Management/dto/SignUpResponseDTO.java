package com.example.Event_Management.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class SignUpResponseDTO {
    @NotBlank(message = "First Name should not be blank")
    private String firstName;
    @NotBlank(message = "Last Name should not be blank")
    private String lastName;
    @Email(message = "Value should be valid email")
    private String email;
}
