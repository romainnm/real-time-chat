import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  constructor() { 
    // Initialize Socket.IO client
    this.socket = io('http://localhost:3000'); // Make sure the URL matches your server
  }

  // Send a chat message to the Socket.IO server
  sendMessage(message: string): void {
    this.socket.emit('chatMessage', message);
  }

  // Return an observable to allow subscribers to listen for new messages
  receiveMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('chatMessage', (msg: any) => {
        observer.next(msg);
      });

      // Optional: Handle errors and disconnections
      return () => {
        this.socket.disconnect();
      };
    });
  }

  // Optional: Close the Socket.IO connection
  closeConnection(): void {
    this.socket.disconnect();
  }
}
