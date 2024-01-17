package com.example.muconnbackend.Service;

import com.example.muconnbackend.DAL.MessageRepository;
import com.example.muconnbackend.Model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    private MessageDto convertMessageToMessageDto(Message message){
        MessageDto messageDto = new MessageDto();
        messageDto.setId((message.getId()));
        messageDto.setSender(message.getSender());
        messageDto.setReceiver(message.getReceiver());
        messageDto.setMessage(message.getMessage());

        return messageDto;
    }
    public void saveMessage(MessageDto messageDto) {
        Message message = new Message();

        User sender = messageDto.getSender();
        User receiver = messageDto.getReceiver();
        if (sender != null && receiver != null) {
            message.setSender(sender);
            message.setReceiver(receiver);
            message.setMessage(messageDto.getMessage());

            messageRepository.save(message);
        }
    }

    public List<MessageDto> getMessagesBetweenUsers(Long userId1, Long userId2) {
        List<Message> messages = messageRepository.findBySender_IdAndReceiver_IdOrSender_IdAndReceiver_IdOrderById(
                userId1, userId2, userId2, userId1);
        List<MessageDto> messageDtos = new ArrayList<>();

        for (Message message : messages) {
            MessageDto messageDto = convertMessageToMessageDto(message);
            messageDtos.add(messageDto);
        }

        return messageDtos;
    }
}
