package com.example.Event_Management.excpetions;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Data
public class ApiError {
    private LocalDateTime timeStamp;
    private HttpStatus status;
    private String error;
    private String message;

    public ApiError(){
        this.timeStamp = LocalDateTime.now();
    }

    public ApiError(HttpStatus status, String error, String message){
        this();
        this.status = status;
        this.error = error;
        this.message = message;
    }
}
