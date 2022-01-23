import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private wsService: WebsocketService) { }

  enviarMensaje(mensaje: string) {
    const payload = {
      de: 'Angular',
      mensaje
    };

    // Emitir un evento al servidor llamando "mensaje" por medio de nuestro socket
    this.wsService.emit('mensaje', payload);
  }
}
