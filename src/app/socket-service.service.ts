import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  socket: SocketIOClient.Socket;
  constructor() {
    this.socket = io.connect('http://localhost:4002');
  }

  listen(eventname: string): Observable<any> {
    return new Observable((subscriber) => {
      console.log(' subscriber ', subscriber)
      this.socket.on(eventname, (data: any) => {
        console.log(' the message ', data);
        subscriber.next(data);
      })
    })
  }
}
