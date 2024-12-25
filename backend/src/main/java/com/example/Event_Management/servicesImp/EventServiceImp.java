package com.example.Event_Management.servicesImp;

import com.example.Event_Management.dto.EventRequestDTO;
import com.example.Event_Management.dto.EventResponseDTO;
import com.example.Event_Management.entities.Event;
import com.example.Event_Management.repository.EventRepository;
import com.example.Event_Management.services.EventService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventServiceImp implements EventService {

    private final ModelMapper  modelMapper;
    private final EventRepository eventRepository;

    @Override
    public ResponseEntity<List<EventResponseDTO>> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        List<EventResponseDTO> eventResponseDTOS = events.stream()
                .map(event -> modelMapper.map(event,EventResponseDTO.class))
                .toList();
        return ResponseEntity.ok(eventResponseDTOS);
    }

    @Override
    public String createNewEvent(EventRequestDTO eventRequestDTO) {
        Event eventToBeSaved = modelMapper.map(eventRequestDTO,Event.class);
        eventRepository.save(eventToBeSaved);

        return "Event created successfully";
    }

    @Override
    public ResponseEntity<EventResponseDTO> getEventById(Long eventId) {
        Optional<Event> event = eventRepository.findById(eventId);
        if(event.isPresent()){
            EventResponseDTO eventResponseDTO = modelMapper.map(event,EventResponseDTO.class);
            return ResponseEntity.ok(eventResponseDTO);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<EventResponseDTO> updateEvent(Long id, EventRequestDTO eventRequestDTO) {
        Optional<Event> event = eventRepository.findById(id);

        if(event.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        Event eventToBeUpdated = event.get();
        //We can update all the details like this, but I am updating the whole event
        //eventToBeUpdated.setTitle(eventRequestDTO.getTitle());
        //updating the complete event
        modelMapper.map(eventRequestDTO,eventToBeUpdated);
        eventRepository.save(eventToBeUpdated);

        EventResponseDTO eventResponseDTO = modelMapper.map(eventToBeUpdated,EventResponseDTO.class);

        return ResponseEntity.ok(eventResponseDTO);
    }

    @Override
    public ResponseEntity<EventResponseDTO> deleteEvent(Long id) {
        Optional<Event> event = eventRepository.findById(id);

        if(event.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        EventResponseDTO eventResponseDTO = modelMapper.map(event,EventResponseDTO.class);
        eventRepository.deleteById(id);

        return ResponseEntity.ok(eventResponseDTO);
    }

}
