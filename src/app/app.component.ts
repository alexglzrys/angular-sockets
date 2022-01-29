import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-sockets';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    // Este es un excelente lugar para suscribirme de forma global a eventos privados en el socket
    // Estos se escucharán en cualquier parte de la aplicación, dado que el AppComponent, es un componente que globa toda nuestra aplciación
    this.chatService.obtenerMensajesPrivados().subscribe(msg => {
      console.log(msg)
    });
  }



}
