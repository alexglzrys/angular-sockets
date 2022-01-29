import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  usuario!: Usuario

  constructor(private wsService: WebsocketService) { }

  ngOnInit(): void {
    this.usuario = this.wsService.usuario;
  }


}
