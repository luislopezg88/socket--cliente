import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public usuario: Usuario;

  constructor(
    private socket: Socket
  ) { 
    this.revisarStatus();
    this.cargarStorage();
  }

  revisarStatus() {
    this.socket.on('connect', () => {
      console.log("conectado al servidor");
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log("Desconectado del servidor");
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any){
    console.log('emitiendo', evento);
    this.socket.emit(evento, payload);
  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWs( nombre: string) {
    
    return new Promise<void>((resolve, reject) => {

      this.socket.emit( 'configurar-usuario', {nombre}, (resp:any) => {

        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve()
      });
    });
  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify( this.usuario ));
  }

  cargarStorage() {
    

    if(localStorage.getItem('usuario')){
      this.usuario = JSON.parse(localStorage.getItem("usuario")!)

      this.loginWs(this.usuario.nombre);
    }
  }




}
