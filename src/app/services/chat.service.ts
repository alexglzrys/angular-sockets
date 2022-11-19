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
      de: this.wsService.getUsuario()!.nombre,
      mensaje
    };

    // Emitir un evento al servidor llamando "mensaje" por medio de nuestro socket
    this.wsService.emit('mensaje', payload);
  }

  obtenerMensajes(): Observable<unknown> {
    // Escuchar el evento de nombre "mensaje-nuevo", este puede ser lanzado en el servidor y viajar a través del socket
    return this.wsService.listen('mensaje-nuevo')
  }

  obtenerMensajesPrivados(): Observable<unknown> {
    // Escuchar el evento mensaje-privado
    return this.wsService.listen('mensaje-privado');
  }

  obtenerUsuariosActivos() {
    // Este evento retorna un observable de tipo array, con los datos de cada usuario conectado
    return this.wsService.listen( 'usuarios-activos' );
  }

  solicitarUsuariosActivos() {
    // Solicitar usuarios activos cuando entro a la ventana de char
    this.wsService.emit('solicitar-usuarios-activos');
  }
}
