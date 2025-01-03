package com.example.Event_Management.controllers;

import com.example.Event_Management.dto.EventRequestDTO;
import com.example.Event_Management.dto.EventResponseDTO;
import com.example.Event_Management.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    @GetMapping
    public ResponseEntity<List<EventResponseDTO>> getAllEvents(){
        return eventService.getAllEvents();
    }
    @PostMapping("/new")
    public String createNewEvent(@RequestBody EventRequestDTO eventRequestDTO){
        return eventService.createNewEvent(eventRequestDTO);
    }
    @GetMapping("/{eventId}")
    public ResponseEntity<EventResponseDTO> getEventById(@PathVariable Long eventId){
        return eventService.getEventById(eventId);
    }
    @PutMapping("/{eventId}")
    public ResponseEntity<EventResponseDTO> updateEvent(@PathVariable("eventId") Long id,@RequestBody EventRequestDTO eventRequestDTO){
        return eventService.updateEvent(id, eventRequestDTO);
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<EventResponseDTO> deleteEvent(@PathVariable("eventId") Long id){
        return eventService.deleteEvent(id);
    }

}
