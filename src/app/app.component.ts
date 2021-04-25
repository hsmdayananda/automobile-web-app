import { Component, OnInit, OnChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocketServiceService } from './socket-service.service';

declare let io: any;
const socket = io('http://localhost:4001');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, OnChanges {


  message: string | undefined;
  ngOnInit(): void {
    // socket.on('connections', (data: any) => {
    //   this.message = data;
    //   console.log('message', this.message)
    // });

    // socket.on('files', (data: any) => {
    //   this.message = data.name;
    //   console.log('message', this.message)
    // });
    // socket.on('fail', (data: any) => console.log(data));
    // socket.on('csv-proc', (data: any) => {
    //   this.message = data.name;
    //   console.log('message', this.message)
    // });


  }

  constructor(private toastr: ToastrService, private socketService: SocketServiceService) {
    this.socketService.listen('csv-proc').subscribe((data) => {
      console.log(' the message ', data);
      this.showToastr(data.name);
    });
  }

  showToastr(data: string) {
    console.log(' hi madara')
    //const options = { positionClass: "toast-top-center" };
    this.toastr.success(data);
  }
  ngOnChanges() {
    console.log(this.message);
  }

}
