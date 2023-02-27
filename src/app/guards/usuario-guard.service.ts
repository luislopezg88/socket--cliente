import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate{

  constructor(
    public wsService: WebsocketService,
    private route: Router
  ) { }

  canActivate() {
    if(this.wsService.getUsuario()) {
      return true;
    } else {
      this.route.navigateByUrl('/');
      return false;
    }

  }
}
