package com.example.Event_Management.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventRequestDTO {
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @NotBlank
    private String imageURL;
    @Future
    private LocalDateTime startTime;
    @Future
    private LocalDateTime endTime;
}
