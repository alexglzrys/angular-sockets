import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  mensaje: string = '';
  mensajesSubscription!: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnDestroy(): void {
    // Cancelar subscripción dedicada a obtenier mensajes enviados en el socket
    this.mensajesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // Nuestro Chat debe suscribirse a los eventos que le interesa escuchar del servidor, los cuales son enviados a través del socket

    this.mensajesSubscription = this.chatService.obtenerMensajes().subscribe(res => {
      console.log(res);
    })
  }

  enviar() {
    // Enviar un mensaje por medio de sockets al servidor
    this.chatService.enviarMensaje(this.mensaje);
    this.mensaje = '';
  }


}
