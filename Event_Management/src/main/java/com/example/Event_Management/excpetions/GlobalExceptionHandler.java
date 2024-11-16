package com.example.Event_Management.excpetions;


import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiError> handleBodRequestException(BadRequestException exception){
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, exception.getMessage(),exception.getLocalizedMessage());
        return new ResponseEntity<>(apiError,HttpStatus.BAD_REQUEST);
    }
}
