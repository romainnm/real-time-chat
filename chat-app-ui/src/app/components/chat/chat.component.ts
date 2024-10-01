import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  message: string = ''; // The message input by the user 
  messages: string[] = []; // Array to store all incoming messages
  private subscription: any;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // Subscribe to the message stream from Socket.IO
    this.subscription = this.chatService.receiveMessages().subscribe((msg: any) => {
      this.messages.push(msg);
    });
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.chatService.closeConnection();
  }

  // Send a message to the Socket.IO server
  sendMessage(): void {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.message); // Send the message
      this.message = ''; // Clear the input field
    }
  }
}
