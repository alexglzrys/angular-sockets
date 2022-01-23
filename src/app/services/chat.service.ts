import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private wsService: WebsocketService) { }

  enviarMensaje(mensaje: string): void {
    const payload = {
      de: 'Angular',
      mensaje
    };

    // Emitir un evento al servidor llamando "mensaje" por medio de nuestro socket
    this.wsService.emit('mensaje', payload);
  }

  obtenerMensajes(): Observable<unknown> {
    // Escuchar el evento de nombre "mensaje-nuevo", este puede ser lanzado en el servidor y viajar a través del socket
    return this.wsService.listen('mensaje-nuevo')
  }
}
