import { Component, OnInit } from '@angular/core';
import { MensajeService } from './services/mensaje.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-sockets';

  constructor(private socket: WebsocketService,
              private mensajeService: MensajeService) { }

  ngOnInit(): void {
    this.mensajeService.enviarMensaje('Hola desde el Frontend');
  }



}
