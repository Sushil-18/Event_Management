package com.example.Event_Management.dto;

import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Data
public class EventResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String imageURL;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
