import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre: string = ''

  constructor(private wsService: WebsocketService,
              private router: Router) { }

  ngOnInit(): void {
  }

  async ingresar() {
    try {
      // Esperar a que el servidor responda correctamente con la configuración del usuario logeado
      await this.wsService.loginWS(this.nombre);
      this.router.navigateByUrl('/mensajes');
    } catch (err) {
      console.log(err);
    }
  }

}
