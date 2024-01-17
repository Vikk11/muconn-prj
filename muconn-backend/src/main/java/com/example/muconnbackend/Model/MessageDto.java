package com.example.muconnbackend.Model;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

public class MessageDto {
    private Long id;
    private User sender;
    private User receiver;
    private String message;


    public MessageDto() {

    }

    public MessageDto(User sender, User receiver, String message){

    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) { this.sender = sender; }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) { this.receiver = receiver; }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
