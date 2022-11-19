import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus: boolean = false;
  public usuario!: Usuario | null;

  // La librería de ngx-socket-io, ya ofrece un servicio para comunicarme con sockets desde el cliente al servidor
  constructor(private socket: Socket,
              private router: Router) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus(): void {
    // Escuchar cuando el cliente se conecta al servidor
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      // Si el servidor se cae y se vuelve a levantar, tratar de recuperar la información de los usuarios actualmente conectados
      this.cargarStorage();
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

  // Configurar nombre del usuario en el servidor de sockets
  loginWS(nombre: string): Promise<boolean> {

    // ! Los sockets no son asincronos, pero debemos ser concientes que la respuesta puede demorar un poco en el servidor
    return new Promise((resolve, reject) => {

      this.emit('configurar-usuario', { nombre }, (res: any) => {
        if (res.ok) {
          // Si todo es correcto, creamos una instancia del usuario conectado en el socket server
          this.usuario = new Usuario(nombre);
          // Guardar los datos del usuario en localstorage
          this.guardarStorage();
          resolve(true);
        } else {
          reject(false);
        }
      });

    });

  }

  logoutWS() {
    // Resetear el usuario y su información del localStorage
    this.usuario = null;
    localStorage.removeItem('usuario');
    // Resetear sus datos a valores por defecto
    const payload = { nombre: 'sin-nombre' };
    // Emitir el evento encargado de configurar el usuario
    this.emit('configurar-usuario', payload, () => {
      // Redireccionar al usuario deslogeado fuera de la aplicación
      // Cerrar sesión en un socket no debería interferir con la sesión activa en el servidor HTTP

      // * El socket sigue existiendo hasta este punto (mismo id), solo que es baneado en la lista de usuarios activos al no tener asignado un nombre real
      // ! El socket realmente se destruye cuando se cierra el navegador
      this.router.navigateByUrl('/');
    })
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario')!)
      // Indicar al socket server que el usuario sigue conservando su nombre, a pesar que el ID generado sea diferente (por haber recargado la página)
      this.loginWS(this.usuario!.nombre);
    }
  }

  getUsuario() {
    return this.usuario;
  }
}
