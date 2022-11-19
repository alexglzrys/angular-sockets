import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuariosActivosObs!: Observable<any>;

  constructor(public chatServices: ChatService) { }

  ngOnInit(): void {
    // Obtener la lista de usuarios activos (como respuesta a la petición o cuando se desconectan)
    this.usuariosActivosObs = this.chatServices.obtenerUsuariosActivos();

    // Solicitar la lista de usurios activos
    this.chatServices.solicitarUsuariosActivos();
  }

}
