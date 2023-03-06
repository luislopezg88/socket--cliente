import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Socket} from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public usuario: Usuario;

  constructor(
    private socket: Socket,
    private router: Router
  ) { 
    this.revisarStatus();
    this.cargarStorage();
  }

  revisarStatus() {
    this.socket.on('connect', () => {
      console.log("conectado al servidor");
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log("Desconectado del servidor");
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any){
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

  logoutWs() {
    
   
    const payload = {
      nombre: 'sin-nombre'
    }
    localStorage.removeItem('usuario');

    //this.emit('configurar-usuario', payload, () => {});
    this.router.navigateByUrl('');
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
