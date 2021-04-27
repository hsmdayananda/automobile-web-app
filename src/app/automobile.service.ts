import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { gql, Apollo } from 'apollo-angular';
import { Automobile } from 'Automobile';



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
      `${this.baseUrl}/file/upload`
    );
  }

  async upload(file: any) {
    this.http.post("http://localhost:4000/automobile/file/upload", file).subscribe((response) => {
    });
  }
  async download(criteria: any) {
    this.http.post("http://localhost:4000/automobile/file/download", criteria).subscribe((response) => {

    });
  }

  automobileUnit(): Observable<any> {
    return new Observable((subscriber) => {
      subscriber.next(this.automobile);
    })
  }

  automobileFetch(id: number) {
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
  }
}
