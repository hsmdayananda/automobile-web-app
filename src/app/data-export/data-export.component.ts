import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AutomobileService } from '../automobile.service';



@Component({
  selector: 'app-data-export',
  templateUrl: './data-export.component.html',
  styleUrls: ['./data-export.component.css']
})

export class DataExportComponent implements OnInit {
  private _fieldName: string = '';
  private _operator: string = '';
  private _value: string = '';




  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo, private automobileService: AutomobileService) { }


  ngOnInit(): void {
  }

  set fieldNameSelected(value: string) {
    console.log('text ', value)
    this._fieldName = value;
  }
  get fieldNameSelected(): string {
    return this._fieldName;
  }

  get operator(): string {
    return this._operator;
  }
  set operator(value: string) {
    this._operator = value;
  }
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    this._value = value;
  }
  submitRequest() {
    console.log(' filter field ', this._fieldName)
    const obj = {
      filterField: this._fieldName,
      operator: this.operator,
      value: parseInt(this.value)
    }
    this.automobileService.download(obj);
  }
}



