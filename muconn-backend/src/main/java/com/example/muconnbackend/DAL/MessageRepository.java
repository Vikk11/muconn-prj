package com.example.muconnbackend.DAL;

import com.example.muconnbackend.Model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findBySender_IdAndReceiver_IdOrSender_IdAndReceiver_IdOrderById(Long senderId1, Long receiverId1, Long senderId2, Long receiverId2);
}
