import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  // Obtener referencia al elemento que sirve de contenedor de los mensajes de chat
  @ViewChild('viewChat') ventana!: ElementRef;

  mensaje: string = '';
  mensajesSubscription!: Subscription;
  mensajes: any[] = [];

  constructor(private chatService: ChatService) { }

  ngOnDestroy(): void {
    // Cancelar subscripción dedicada a obtenier mensajes enviados en el socket
    this.mensajesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // Nuestro Chat debe suscribirse a los eventos que le interesa escuchar del servidor, los cuales son enviados a través del socket

    this.mensajesSubscription = this.chatService.obtenerMensajes().subscribe(res => {
      // Cada mensaje que llega lo vamos empujando al final del arreglo
      this.mensajes.push(res);

      // Colocar el scroll al final del listado. Se hace de esta forma ya que se tiene que esperar hasta que el elemento sea renderizado en pantalla
      setTimeout(() => {
        this.ventana.nativeElement.scrollTop = this.ventana.nativeElement.scrollHeight;
      }, 50);
    })
  }

  enviar() {
    // Enviar un mensaje por medio de sockets al servidor
    this.chatService.enviarMensaje(this.mensaje);
    this.mensaje = '';
  }


}
