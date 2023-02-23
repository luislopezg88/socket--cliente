import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;


  constructor(
    private socket: Socket
  ) { 
    this.revisarStatus();
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
}
