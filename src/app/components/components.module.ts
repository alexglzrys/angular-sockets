import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';



@NgModule({
  declarations: [
    FooterComponent,
    ChatComponent,
    ListaUsuariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    FooterComponent,
    ChatComponent,
    ListaUsuariosComponent
  ]
})
export class ComponentsModule { }
