package com.example.Event_Management.excpetions;

import org.aspectj.bridge.IMessage;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String message){
        super(message);
    }
}
