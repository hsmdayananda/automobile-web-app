import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import { gql, Apollo } from 'apollo-angular';
import { Automobile } from 'Automobile';

const CSV_EXTENSION = '.csv';
const CSV_TYPE = 'text/plain;charset=utf-8';


@Injectable({
  providedIn: 'root'
})
export class AutomobileService {
  formObj: any = {};
  automobile: any = {};

  updateQuery = gql`mutation updateAutomobiles($id: Int!,$automobileInput: AutomobileInput!){
    update(id:$id, automobileInput: $automobileInput){
      firstName
    }
  }`

  baseUrl = `http://localhost:4000/automobile`;
  constructor(private http: HttpClient, private apollo: Apollo) {

  }

  async fileUpload(): Promise<Observable<any>> {
    return this.http.get(
      `${this.baseUrl}/file`
    );
  }

  public upload(data: any, userId: any) {
    let uploadURL = `${this.baseUrl}/file`;

    return this.http.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events',
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = '';
          return { status: 'File Uploaded', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }
  private saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, fileName);
  }
  public exportToCsv(rows: Object[], fileName: string, columns?: string[]) {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]).filter(k => {
      if (columns?.length) {
        return columns.includes(k);
      } else {
        return true;
      }
    });
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map((row: { [x: string]: any; }) => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');
    this.saveAsFile(csvContent, `${fileName}${CSV_EXTENSION}`, CSV_TYPE);
  }



  automobileUnit(): Observable<any> {
    return new Observable((subscriber) => {
      subscriber.next(this.automobile);
    })
  }

  automobileFetch(id: number) {
    //return new Observable((subscriber) => {
    this.automobile = new Automobile();

    const getQuery = gql`
    query {
      automobileById(id: ${id}){
        id
        firstName
        lastName
        email
        ageOfVehicle
        carMake
        carModel
        vinNumber
        manufacturedDate
        }
      }
      
    `
    this.automobile = this.apollo
      .watchQuery({
        query: getQuery,
      })
      .valueChanges.pipe(
        (result: any) => {
          result.subscribe(async (res: any) => {
            this.automobile = res.data.automobileById;
            console.log('automobile x', this.automobile)
          });
          console.log(' get automobile ', result)
          return result;

        });
    //subscriber.next(this.automobile);
    // })
  }
}
