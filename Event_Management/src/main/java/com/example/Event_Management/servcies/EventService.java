package com.example.Event_Management.servcies;

import com.example.Event_Management.dto.EventRequestDTO;
import com.example.Event_Management.dto.EventResponseDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface EventService {
    ResponseEntity<List<EventResponseDTO>> getAllEvents();

    String createNewEvent(EventRequestDTO eventRequestDTO);

    ResponseEntity<EventResponseDTO> getEventById(Long id);

    ResponseEntity<EventResponseDTO> updateEvent(Long id, EventRequestDTO eventRequestDTO);
}
