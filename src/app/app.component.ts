import { Component, OnInit, OnChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocketServiceService } from './socket-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, OnChanges {


  message: string | undefined;
  ngOnInit(): void { }

  constructor(private toastr: ToastrService, private socketService: SocketServiceService) {
    this.socketService.listen('file-upolad').subscribe((data) => {
      console.log(' socket data ', data)
      this.showToastr(data);
    });

    this.socketService.listen('file-download').subscribe((data) => {
      console.log(' socket data ', data)
      this.showToastr(data);
    });
  }

  showToastr(data: string) {
    this.toastr.success(data);
  }
  ngOnChanges() { }

}
