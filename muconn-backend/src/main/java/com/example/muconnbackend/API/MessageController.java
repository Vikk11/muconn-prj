package com.example.muconnbackend.API;

import com.example.muconnbackend.Model.Message;
import com.example.muconnbackend.Model.MessageDto;
import com.example.muconnbackend.Model.User;
import com.example.muconnbackend.Service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/saveMessage")
    public ResponseEntity<String> saveMessage(@RequestBody MessageDto message) {
        messageService.saveMessage(message);
        return ResponseEntity.ok("Saved successfully");
    }

    @GetMapping("/{user1Id}/allMessages/{user2Id}")
    public List<MessageDto> getMessagesBetweenUsers(@PathVariable Long user1Id, @PathVariable Long user2Id) {
        return messageService.getMessagesBetweenUsers(user1Id, user2Id);
    }
}
