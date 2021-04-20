import { Component, OnInit, OnChanges } from '@angular/core';

declare let io: any;
const socket = io('http://localhost:4001');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, OnChanges {

  message: string | undefined;
  constructor() {

  }

  ngOnInit(): void {
    socket.on('connections', (data: any) => {
      this.message = data;
      console.log('message', this.message)
    });

    socket.on('files', (data: any) => {
      this.message = data.name;
      console.log('message', this.message)
    });
    socket.on('fail', (data: any) => console.log(data));
    socket.on('csv-proc', (data: any) => {
      this.message = data.name;
      console.log('message', this.message)
    });


  }

  ngOnChanges() {
    console.log(this.message);
  }

}
