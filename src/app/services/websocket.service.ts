import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus: boolean = false;

  // La librería de ngx-socket-io, ya ofrece un servicio para comunicarme con sockets desde el cliente al servidor
  constructor(private socket: Socket) {
    this.checkStatus();
  }

  checkStatus(): void {
    // Escuchar cuando el cliente se conecta al servidor
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    // Escuchar cuando el cliente se desconecta del servidor
    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  // Método para emitir eventos (enviar mensaje a través de un socket)
  emit(evento: string, payload?: any, callback?: Function) {
    // emit('EVENTO', payload, callback)
    // El payload por lo general en Sockets es un objeto con información, pero puede ser de cualquier tipo
    this.socket.emit(evento, payload, callback);
  }

  // Método para escuchar eventos (mensajes enviados por el servidor a través de sockets)
  // Esto regresa un observable para desuscribirse en cualquier momento (abandobar la ventana de chat)
  // El payload de los eventos, puede ser de cualquier tipo, por tanto lo dejamos como desconocido
  listen(evento: string): Observable<unknown> {
    return this.socket.fromEvent(evento);
  }
}
