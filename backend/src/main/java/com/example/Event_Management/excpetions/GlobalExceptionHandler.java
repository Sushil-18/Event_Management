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

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleResourceNotFoundException(ResourceNotFoundException exception){
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND,exception.getMessage(),exception.getLocalizedMessage());
        return new ResponseEntity<>(apiError,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ApiError> handleUserAlreadyExists(UserAlreadyExistsException exception){
        ApiError apiError = new ApiError(HttpStatus.CONFLICT, exception.getMessage(), exception.getLocalizedMessage());
        return new ResponseEntity<>(apiError,HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserRegistrationException.class)
    public ResponseEntity<ApiError> handleUserRegistration(UserRegistrationException exception){
        ApiError apiError = new ApiError(HttpStatus.SERVICE_UNAVAILABLE, exception.getMessage(),exception.getLocalizedMessage());
        return new ResponseEntity<>(apiError,HttpStatus.SERVICE_UNAVAILABLE);
    }
}
